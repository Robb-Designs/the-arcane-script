import * as React from "react";

import { cn } from "@/lib/utils";

import "@/components/ui/8bit/styles/retro.css";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "retro relative border-2 border-amber-300/90 bg-zinc-900/90 text-amber-50 shadow-[4px_4px_0px_rgba(251,191,36,0.85)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_rgba(251,191,36,0.85)]",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("p-4 md:p-5 text-[11px] leading-relaxed tracking-wide", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 pt-4 md:px-5 md:pt-5 pb-2 border-b border-amber-300/30", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("retro text-sm uppercase tracking-widest text-amber-300", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("mt-2 text-[10px] md:text-[11px] text-amber-100/80 leading-relaxed", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 pb-4 md:px-5 md:pb-5 pt-2 border-t border-amber-300/30", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
