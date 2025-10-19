import { Bot } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";

const ChatHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <Avatar className="flex items-center justify-center w-20 h-20 rounded-full bg-border/60">
        <Bot width={48} height={48} className="text-accent-foreground" />
      </Avatar>
      <p className="my-2 font-normal select-none">MatrixCHAT</p>
      <p className="font-light select-none text-muted-foreground">
        Experimente as recomendações
      </p>
    </div>
  );
};

export default ChatHeader;
