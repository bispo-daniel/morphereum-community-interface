export type BlockedMessagePayload = {
  message: string;
  unblockDate: string;
  unblockDateFormatted: string;
};

export type BotMessage = string;

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  createdAt: Date;
  isTyping?: boolean;
};

export type HandleSubmitType = {
  (options: { promptRecommendation: string }): void;
  (): void;
};
