"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <SectionHeader id='contact' className="relative mb-14" title={
        <>
          LET&apos;S WORK <br />
          TOGETHER
        </>} />
      <div className="grid grid-cols-1 relative z-[9999] mx-4 md:mx-0">
        <Card className="w-full max-w-xl bg-card border-2 border-foreground shadow-brutal-lg mt-6 md:mt-10">
          <CardHeader>
            <CardTitle className="text-4xl uppercase tracking-tight">Contact Form</CardTitle>
            <CardDescription className="font-mono text-sm">
              Mail me at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="font-bold text-accent-foreground bg-accent px-1 border border-foreground cursor-can-hover"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your info here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
