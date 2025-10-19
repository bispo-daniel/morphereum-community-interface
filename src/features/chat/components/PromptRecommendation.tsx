import classNames from "classnames";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

const PromptRecommendation = ({
  title,
  content,
  onClick,
  handleSubmit,
  isBlocked,
}: {
  title: string;
  content: string;
  onClick: () => void;
  handleSubmit: (options?: { promptRecommendation?: string }) => void;
  isBlocked: boolean;
}) => (
  <div
    className={classNames({
      "flex w-full cursor-pointer items-center gap-2 rounded-lg border px-4 py-2":
        true,
      "hover:cursor-not-allowed": isBlocked,
    })}
    onClick={isBlocked ? undefined : onClick}
  >
    <div className="flex-1 w-0 min-w-0 overflow-hidden text-left">
      <h3 className="text-sm truncate">{title}</h3>
      <p className="text-xs font-light truncate text-muted-foreground">
        {content}
      </p>
    </div>

    <Button
      size="icon"
      className="z-10 w-6 h-6 ml-auto rounded-full shrink-0 bg-primary"
      disabled={isBlocked}
      onClick={(e) => {
        e.stopPropagation();
        handleSubmit({ promptRecommendation: content });
      }}
    >
      <ArrowUp className="w-3 h-3" />
    </Button>
  </div>
);

export default PromptRecommendation;
