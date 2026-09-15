import { cn } from "@/lib/utils"
import Link from "next/link"
import { BoxReveal } from "../reveal-animations"
import { ReactNode } from "react"

export const SectionHeader = ({ id, title, desc, className }: { id: string, title: string | ReactNode, desc?: string, className?: string }) => {
  return (
    <div className={cn("top-[90px] sticky mb-96 pt-4 ml-4 md:ml-8 lg:ml-12", className)}>
      {/* Thick left accent bar + yellow highlight block */}
      <div className="flex items-start gap-0 mb-2">
        <span className="w-2 self-stretch bg-accent shrink-0" aria-hidden />
        <div className="border-2 border-foreground border-l-0 px-6 py-2 bg-background shadow-brutal-lg">
          <Link href={`#${id}`}>
            <BoxReveal width="100%">
              <h2
                className={cn(
                  "text-4xl text-left md:text-5xl lg:text-6xl font-black uppercase tracking-tight",
                  "text-foreground"
                )}
              >
                {title}
              </h2>
            </BoxReveal>
          </Link>
          {desc && (
            <p className="mt-1 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              — {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
