"use client";
import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "motion/react";

import { SocketContext, Message, ChatItem } from "@/contexts/socketio";
import { useToast } from "@/components/ui/use-toast";
import { Users, Users2, Hash, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

import { useChatScroll } from "./hooks/use-chat-scroll";
import { useTyping } from "./hooks/use-typing";
import { useSounds } from "./hooks/use-sounds";
import { useConnectionStatus } from "./hooks/use-connection-status";
import { ChatMessageList } from "./components/chat-message-list";
import { ChatInput } from "./components/chat-input";
import type { ProcessedCommand } from "./components/slash-command-menu";
import { UserList } from "./components/user-list";
import { EditProfileModal } from "./components/edit-profile-modal";
import { AdminPasswordDialog } from "./components/admin-password-dialog";
import { THEME } from "./constants";
import { getAvatarUrl } from "@/lib/avatar";
import { config } from "@/data/config";

const OnlineUsers = () => {
  const { socket, users: _users, msgs, setMsgs, hasMoreMessages, loadingHistory, fetchOlderMessages, initStatus, fetchInitialMessages } = useContext(SocketContext);
  const users = Array.from(_users.values());
  const [showUserList, setShowUserList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<"discord" | "chat">("discord");
  const [discordMode, setDiscordMode] = useState<"widgetbot" | "official">("widgetbot");
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [editTarget, setEditTarget] = useState<Message | null>(null);
  const [showAdminDialog, setShowAdminDialog] = useState(false);

  const currentUser = users.find(u => u.socketId === socket?.id) || users[users.length - 1];
  const { toast } = useToast();
  const { playSendSound, playReceiveSound } = useSounds();
  const connectionStatus = useConnectionStatus(socket);
  const prevMsgsLength = useRef(msgs.length);

  // Driven by the server's "warning" event when msg-send is rate limited
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  // Listen for server rate limit warnings and show the cooldown banner
  useEffect(() => {
    if (!socket) return;
    const onWarning = (data: { message: string }) => {
      if (data.message.includes("msg-send")) {
        setRateLimitedUntil(Date.now() + 10_000);
      }
    };
    socket.on("warning", onWarning);
    return () => { socket.off("warning", onWarning); };
  }, [socket]);

  // Play send/receive sounds for regular messages
  useEffect(() => {
    if (msgs.length > prevMsgsLength.current) {
      // Skip sounds when receiving initial message history (large batch on connect)
      const isSmallBatch = msgs.length - prevMsgsLength.current <= 2;
      const lastMsg = msgs[msgs.length - 1];
      const isSystem = lastMsg && "type" in lastMsg && lastMsg.type === "system";
      let isRecent = true;
      if (lastMsg?.createdAt) {
        const msgTime = new Date(lastMsg.createdAt).getTime();
        if (Date.now() - msgTime > 10000) isRecent = false;
      }

      if (isSmallBatch && isRecent && lastMsg && !isSystem) {
        if (lastMsg.username === currentUser?.name) playSendSound();
        else playReceiveSound();
      }
    }
    prevMsgsLength.current = msgs.length;
  }, [msgs, playSendSound, playReceiveSound, currentUser]);



  // Use custom hooks
  const {
    chatContainer,
    showScrollButton,
    unreads,
    scrollToBottom,
    isAtBottomRef
  } = useChatScroll(
    isOpen,
    msgs.length,
    currentUser?.id,
    msgs[msgs.length - 1]?.sessionId,
    msgs[0]?.id ? String(msgs[0].id) : undefined
  );

  const {
    typingUsers,
    handleTyping,
    getTypingText
  } = useTyping(
    socket,
    currentUser,
    scrollToBottom,
    isAtBottomRef
  );

  const handleEditLastMessage = useCallback(() => {
    if (!currentUser) return;
    const fiveMinAgo = Date.now() - 5 * 60 * 1000;
    for (let i = msgs.length - 1; i >= 0; i--) {
      const item = msgs[i];
      if ("type" in item && item.type === "system") continue;
      const msg = item as Message;
      if (msg.sessionId !== currentUser.id) continue;
      if (new Date(msg.createdAt).getTime() < fiveMinAgo) break;
      setEditTarget(msg);
      return;
    }
  }, [msgs, currentUser]);

  const handleCommand = (cmd: ProcessedCommand) => {
    if (cmd.type === "admin") {
      setShowAdminDialog(true);
      return;
    }
    if (editTarget) {
      if (socket) {
        socket.emit("msg-edit", { id: editTarget.id, content: cmd.content });
      } else {
        setMsgs(prev => prev.map(m =>
          String(m.id) === String(editTarget.id) && (!("type" in m) || !m.type)
            ? { ...m, content: cmd.content, editedAt: new Date().toISOString() }
            : m
        ));
      }
      setEditTarget(null);
      return;
    }

    if (socket) {
      socket.emit("msg-send", {
        content: cmd.content,
        ...(replyTarget && { replyTo: replyTarget.id }),
      });
    } else {
      const activeUser = currentUser || {
        id: "user-you",
        name: "You (Visitor)",
        avatar: getAvatarUrl("Visitor"),
        color: "#489653",
        location: "Local",
        flag: "🌐",
      };
      const newMsg: Message = {
        id: String(Date.now()),
        sessionId: activeUser.id,
        flag: activeUser.flag || "🌐",
        country: activeUser.location || "Local",
        username: activeUser.name,
        avatar: activeUser.avatar,
        color: activeUser.color,
        content: cmd.content,
        createdAt: new Date().toISOString(),
        ...(replyTarget && {
          replyTo: {
            id: replyTarget.id,
            username: replyTarget.username,
            content: replyTarget.content,
          },
        }),
      };
      setMsgs(prev => [...prev, newMsg]);
    }
    setReplyTarget(null);
  };

  const updateProfile = ({ name, avatar, color }: { name: string; avatar: string, color?: string }) => {
    socket?.emit("update-user", {
      username: name,
      avatar,
      color
    });
    localStorage.setItem("username", name);
    localStorage.setItem("avatar", avatar);
    if (color) localStorage.setItem("color", color);
    const { dismiss } = toast({ title: "Profile updated" });
    setTimeout(dismiss, 3000);
  };

  // Feature 6: Keyboard shortcut Ctrl+/ to toggle chat
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      if (prev) setShowUserList(false);
      else fetchInitialMessages();
      return !prev;
    });
  }, [fetchInitialMessages]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        toggleOpen();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [toggleOpen]);

  const isSingleUser = users.length <= 1;

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={(newOpen) => {
          // Prevent popover from closing while the profile modal is open (clicks outside)
          if (!newOpen && isEditingProfile) return;
          setIsOpen(newOpen);
          if (newOpen) fetchInitialMessages();
          if (!newOpen) setShowUserList(false)
        }}
      >
        <div className="flex items-center gap-2" data-no-custom-cursor="true">
          {/* Feature 4: "N people here" label */}
          <AnimatePresence>
            {users.length >= 2 && !isOpen && (
              <motion.span
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className={cn("text-xs hidden md:block font-medium whitespace-nowrap select-none", THEME.text.secondary)}
              >
                {users.length} people here
              </motion.span>
            )}
          </AnimatePresence>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-10 w-12 transition-all duration-300 z-50 p-0 relative",
                      "bg-background/20 hover:bg-background/80 backdrop-blur-sm border border-slate-400/40 dark:border-slate-400/50 rounded-xl",
                      !isOpen && unreads > 0 && "animate-pulse border-green-500/50"
                    )}
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: [0.1, 2], opacity: [1, 0] }}
                          transition={{
                            duration: .4,
                            delay: 0,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                          className={cn("absolute -inset-1 rounded-full", unreads > 0 ? "bg-green-500/40" : "bg-transparent")}
                        />
                        <Users2 className="w-5 h-5 text-foreground" />
                      </div>

                      <span className={cn(
                        "absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-extrabold shadow-sm transition-colors",
                        unreads > 0 ? "bg-green-500 text-white" : "bg-[#ff6b6b] text-white"
                      )}>
                        {unreads > 0 ? unreads : users.length}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Chat <kbd className="ml-1 text-[10px] opacity-60">Ctrl+/</kbd></p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <PopoverContent
          className={cn(
            "w-80 min-h-[400px] sm:w-96 p-0 border-none shadow-2xl overflow-hidden rounded-xl mr-4 mb-4 flex flex-col",
            THEME.bg.primary,
            THEME.text.primary
          )}
          side="top"
          data-no-custom-cursor="true"
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className={cn("h-12 flex items-center justify-between px-3 shadow-sm border-b shrink-0 gap-2", THEME.bg.secondary, THEME.border.primary)}>
            <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab("discord")}
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded transition-colors flex items-center gap-1",
                  activeTab === "discord"
                    ? "bg-[#5865f2] text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Discord
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded transition-colors flex items-center gap-1",
                  activeTab === "chat"
                    ? "bg-[#5865f2] text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Hash className="w-3 h-3" />
                Chat
              </button>
            </div>

            <div className="flex items-center gap-2">
              {activeTab === "chat" && currentUser && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 gap-2 transition-colors rounded-full",
                    THEME.bg.hover,
                    THEME.text.secondary,
                    "hover:text-[#060607] dark:hover:text-white"
                  )}
                  onClick={() => setIsEditingProfile(true)}
                  title="Edit Profile"
                >
                  <div className="relative w-7 h-7">
                    <img
                      src={getAvatarUrl(currentUser.avatar)}
                      className="w-full h-full rounded-full ring-1 ring-black/10 dark:ring-white/10"
                      style={{ backgroundColor: currentUser.color || '#60a5fa' }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#5865f2] rounded-full border-2 border-[var(--bg-primary)]">
                      <Settings className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                </Button>
              )}

              {activeTab === "chat" && (
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "transition-colors gap-2 h-8 px-2 text-xs",
                    THEME.bg.hover,
                    `hover:${THEME.text.header.replace("text-", "text-")} `,
                    "hover:text-[#060607] dark:hover:text-white",
                    showUserList && cn(THEME.text.header, THEME.bg.active)
                  )}
                  onClick={() => setShowUserList(!showUserList)}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" aria-label="Online" role="status" />
                    <span>{users.length}</span>
                  </div>
                  <Users className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className={cn("relative flex flex-col flex-1", THEME.bg.primary)}>
            {activeTab === "discord" ? (
              <div className="w-full h-[450px] bg-[#2b2d31] flex flex-col overflow-hidden">
                {/* Server Join Banner & Mode Switcher */}
                <div className="p-2.5 bg-[#1e1f22] border-b border-black/20 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                      DC
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">THE DENVER CLUB</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <button
                          type="button"
                          onClick={() => setDiscordMode("widgetbot")}
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors",
                            discordMode === "widgetbot" ? "bg-[#5865f2] text-white" : "text-gray-400 hover:text-white"
                          )}
                        >
                          WidgetBot Chat
                        </button>
                        <button
                          type="button"
                          onClick={() => setDiscordMode("official")}
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors",
                            discordMode === "official" ? "bg-[#5865f2] text-white" : "text-gray-400 hover:text-white"
                          )}
                        >
                          Server Widget
                        </button>
                      </div>
                    </div>
                  </div>
                  <a
                    href={config.discord.inviteUrl || "https://discord.gg/pk2hEkJMP"}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors shrink-0"
                  >
                    Join Server
                  </a>
                </div>

                {/* Dynamic Embed iframe */}
                {discordMode === "widgetbot" ? (
                  <iframe
                    src={`https://e.widgetbot.io/channels/${config.discord.serverId}/${config.discord.channelId}`}
                    width="100%"
                    height="100%"
                    allow="clipboard-write"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-forms"
                    className="w-full flex-1 border-none"
                    title="Discord WidgetBot Chat"
                  />
                ) : (
                  <iframe
                    src={`https://discord.com/widget?id=${config.discord.serverId}&theme=dark`}
                    width="100%"
                    height="100%"
                    allowTransparency={true}
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="w-full flex-1 border-none"
                    title="Official Discord Server Widget"
                  />
                )}
              </div>
            ) : (
              <>
                <ChatMessageList
                  msgs={msgs}
                  users={users}
                  currentUser={currentUser}
                  chatContainerRef={chatContainer}
                  showScrollButton={showScrollButton}
                  unreads={unreads}
                  scrollToBottom={scrollToBottom}
                  isSingleUser={isSingleUser}
                  typingUsers={typingUsers}
                  getTypingText={getTypingText}
                  onReply={setReplyTarget}
                  onEdit={setEditTarget}
                  hasMoreMessages={hasMoreMessages}
                  loadingHistory={loadingHistory}
                  onLoadMore={fetchOlderMessages}
                  initStatus={initStatus}
                />

                <ChatInput
                  onSendMessage={handleCommand}
                  onTyping={handleTyping}
                  placeholder="Message #general"
                  replyTarget={replyTarget}
                  onCancelReply={() => setReplyTarget(null)}
                  editTarget={editTarget}
                  onCancelEdit={() => setEditTarget(null)}
                  onEditLastMessage={handleEditLastMessage}
                  rateLimitedUntil={rateLimitedUntil}
                />

                <UserList
                  users={users}
                  socket={socket}
                  showUserList={showUserList}
                  onClose={() => setShowUserList(false)}
                  onEditProfile={() => setIsEditingProfile(true)}
                />
              </>
            )}
          </div>

        </PopoverContent>
      </Popover>

      {currentUser && (
        <EditProfileModal
          user={currentUser}
          isOpen={isEditingProfile}
          onClose={() => setIsEditingProfile(false)}
          updateProfile={updateProfile}
        />
      )}

      <AdminPasswordDialog
        isOpen={showAdminDialog}
        onClose={() => setShowAdminDialog(false)}
        onSubmit={(password) => socket?.emit("admin-auth", { password })}
      />
    </>
  );
};

export default OnlineUsers;
