import classNames from "classnames";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PromptRecommendation from "./PromptRecommendation";

type InputFormProps = {
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (options?: { promptRecommendation?: string }) => void;
  isLoading: boolean;
  isBlocked: boolean;
  recommendations: { title: string; content: string }[];
  shouldShowRecommendations: boolean;
};

const InputForm = ({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  isLoading,
  isBlocked,
  recommendations,
  shouldShowRecommendations,
}: InputFormProps) => {
  const unblockDateFormatted = localStorage.getItem("unblockDateFormatted");

  const [shuffledRecommendations, setShuffledRecommendations] = useState<
    { title: string; content: string }[]
  >([]);

  const shuffleArray = (array: { title: string; content: string }[]) =>
    [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setShuffledRecommendations(shuffleArray(recommendations).slice(0, 4));
  }, [recommendations]);

  return (
    <div className="px-4 pb-4 bg-transparent select-none">
      {shouldShowRecommendations && (
        <div className="flex flex-col flex-1 w-full min-w-0 px-4 mb-2 md:flex-row md:space-x-4">
          <div className="flex-1 w-full min-w-0 space-y-2">
            {shuffledRecommendations.slice(0, 2).map((rec, index) => (
              <PromptRecommendation
                key={index}
                title={rec.title}
                content={rec.content}
                onClick={() => setInput(rec.content)}
                handleSubmit={handleSubmit}
                isBlocked={isBlocked}
              />
            ))}
          </div>

          <div className="hidden md:flex md:w-full md:min-w-0 md:flex-1 md:flex-col md:space-y-2">
            {shuffledRecommendations.slice(2).map((rec, index) => (
              <PromptRecommendation
                key={index}
                title={rec.title}
                content={rec.content}
                onClick={() => setInput(rec.content)}
                handleSubmit={handleSubmit}
                isBlocked={isBlocked}
              />
            ))}
          </div>
        </div>
      )}

      {isBlocked && (
        <p className="flex gap-1 px-5 pb-1 text-xs text-red-500">
          <span className="hidden md:block">Limite atingido!</span>
          <span>Disponível em {unblockDateFormatted}. ⏳</span>
        </p>
      )}

      {/* CONTÊINER DO INPUT — leve “vidro” no dark */}
      <div className="relative flex w-full items-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.075)] dark:border dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_28px_rgba(0,0,0,0.45)] supports-[backdrop-filter]:dark:backdrop-blur">
        <Input
          disabled={isLoading || isBlocked}
          placeholder="Envie uma mensagem para o MatrixCHAT"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() && !isLoading && !isBlocked) {
              handleSubmit();
            }
          }}
          className="/* dark: input mais legível e com foco visível */ w-full rounded-full py-6 pr-14 text-base leading-normal focus-visible:ring-2 focus-visible:ring-black/5 dark:border-transparent dark:bg-transparent dark:text-white dark:placeholder-white/40 focus-visible:dark:border-transparent dark:focus-visible:ring-white/20"
        />

        <div
          className={classNames("absolute right-2 flex items-center", {
            "cursor-not-allowed": !input.trim() || isLoading || isBlocked,
          })}
        >
          <Button
            type="button"
            size="icon"
            aria-label="Enviar mensagem"
            disabled={!input.trim() || isLoading || isBlocked}
            onClick={() => handleSubmit()}
            className={classNames(
              "z-2 h-9 w-9 rounded-full",
              // mantém cor primária e melhora contraste no dark
              "bg-primary active:bg-primary/90 [@media(hover:hover)]:hover:bg-primary/90",
              "disabled:cursor-not-allowed disabled:opacity-60",
              "focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/25",
              "dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)]",
            )}
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
