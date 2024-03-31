import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

export function AvatarProfile({ src, alt, children, className }: any) {
  return (
    <a className={cn("blur-picture flex self-start", className)}>
      <a className="blur-picture flex self-start">
        <Avatar className={cn("w-10 h-10", className)}>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </a>
    </a>
  );
}
