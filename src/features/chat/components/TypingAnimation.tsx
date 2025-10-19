import { Bot } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";

import { TypingAnimationEllipsis } from ".";

const TypingAnimation = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-start gap-3">
        <Avatar className="flex items-center justify-center w-8 h-8 rounded-md bg-border/60">
          <Bot width={18} height={18} className="text-accent-foreground" />
        </Avatar>
        <div className="relative group">
          <TypingAnimationEllipsis />
        </div>
      </div>
      <div className="text-xs text-left select-none ml-11 text-muted-foreground">
        MatrixCHAT · pensando...
      </div>
    </div>
  );
};

export default TypingAnimation;
