import { motion } from "framer-motion";
import { Bot, Check, Copy, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { TwitterShareButton, XIcon } from "react-share";
import remarkGfm from "remark-gfm";
import { type Socket, io } from "socket.io-client";

import { Alert } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import env from "@/config";
import { BlockedMessagePayload, BotMessage } from "@/features/chat/types";

import { useRaidData } from "../api/getRaidData";
import { useRegisterChatMessageInRaid } from "../api/registerChatMessageInRaid";
import { useRegisterRaidAccess } from "../api/registerRaidAccess";
import RaidSkeleton from "./RaidSkeleton";

const socket: Socket = io(env.VITE_WS_URL, {
  transports: ["websocket"],
});

const RaidTarget = () => {
  const unblockDateFormatted = localStorage.getItem("unblockDateFormattedRaid");
  const botRaidMessage = localStorage.getItem("bot-raid-message");

  const { ref, inView } = useInView({ threshold: 0.1 });
  const { mutate: registerRaidAccess } = useRegisterRaidAccess();
  const { mutate: registerChatMessageInRaid } = useRegisterChatMessageInRaid();

  const { data, isFetching } = useRaidData();
  const [progress, setProgress] = useState(20);
  const [isCopied, setIsCopied] = useState(false);

  const [botMessage, setBotMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const openLink = () => {
    registerRaidAccess();
    window.open(data?.url || "", "_blank");
  };

  const generateAiMessage = () => {
    if (isBlocked || isLoading) return;

    const platform = data?.platform;
    const shareMessage = data?.shareMessage;

    setIsLoading(true);

    registerChatMessageInRaid();
    socket.emit("raid-message", { platform, shareMessage });
  };

  const copyAiMessage = () => {
    navigator.clipboard.writeText(botMessage);

    setIsCopied(true);
    setAlertMessage("A mensagem foi copiada para a área de transferência.");
    setTimeout(() => {
      setIsCopied(false);
      setAlertMessage("");
    }, 3000);
  };

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const totalMillisInDay = endOfDay.getTime() - startOfDay.getTime();
      const currentMillis = now.getTime() - startOfDay.getTime();

      const percentage = (currentMillis / totalMillisInDay) * 100;
      setProgress(percentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🔗 Connected to WebSocket");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    socket.on("bot-raid-message", (message: BotMessage) => {
      setBotMessage(message);
      setIsLoading(false);

      localStorage.setItem("bot-raid-message", message);
    });

    socket.on(
      "raid-blocked",
      ({ unblockDateFormatted, unblockDate }: BlockedMessagePayload) => {
        setIsLoading(false);

        localStorage.setItem("isBlockedRaid", "true");
        localStorage.setItem("unblockDateRaid", unblockDate);
        localStorage.setItem("unblockDateFormattedRaid", unblockDateFormatted);
        setIsBlocked(true);
      },
    );

    return () => {
      socket.off("bot-raid-message");
      socket.off("raid-blocked");
    };
  }, []);

  useEffect(() => {
    const checkUnblockTime = () => {
      const unblockDateStored = localStorage.getItem("unblockDateRaid");

      if (unblockDateStored) {
        const now = new Date().getTime();
        const unblockTime = new Date(unblockDateStored).getTime();

        if (now >= unblockTime) {
          localStorage.removeItem("isBlockedRaid");
          localStorage.removeItem("unblockDateRaid");
          localStorage.removeItem("unblockDateFormattedRaid");
          localStorage.removeItem("bot-raid-message");

          setIsBlocked(false);
        }
      }
    };

    checkUnblockTime();

    const interval = setInterval(checkUnblockTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const elements = [
    <CardHeader className="pb-0" key="header">
      <div className="flex items-center justify-between">
        <CardTitle className="w-fit select-none text-[32px]">
          Daily raid
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TwitterShareButton
                url={data?.url || ""}
                title={data?.shareMessage || ""}
                className="w-fit"
              >
                <XIcon size={32} round />
              </TwitterShareButton>
            </TooltipTrigger>
            <TooltipContent>
              <p className="select-none">Compartilhe no X</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardHeader>,
    <CardContent key="content">
      {isFetching ? (
        <RaidSkeleton />
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
          {data?.content || ""}
        </ReactMarkdown>
      )}

      <div className="w-full mt-8 mb-2">
        <Progress value={progress} max={100} />
      </div>
    </CardContent>,
    <CardFooter key="footer">
      <div className="flex items-center justify-between w-full">
        <Button
          className="px-2 select-none animate-wiggle hover:animate-none md:px-4"
          onClick={openLink}
        >
          <Target />
          Raid
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button onClick={generateAiMessage} className="px-2 md:px-4">
              <Bot />
              Gerar mensagem IA
            </Button>
          </SheetTrigger>
          <SheetContent
            className="space-between mt-[30px] flex h-full w-[400px] flex-col sm:w-[540px]"
            aria-describedby={undefined}
          >
            <div className="flex flex-col justify-between w-full h-full pb-4">
              <SheetHeader>
                <SheetTitle className="select-none">Mensagem gerada</SheetTitle>

                <div className="text-sm text-muted-foreground">
                  {isBlocked && (
                    <p className="mb-2 text-xs text-red-500">
                      Limite atingido! Disponível em {unblockDateFormatted}. ⏳
                    </p>
                  )}

                  {botRaidMessage && <span>{botRaidMessage}</span>}

                  {isLoading ? <BotMessageSkeleton /> : botMessage}
                </div>
              </SheetHeader>

              <SheetFooter>
                <Button className="w-full select-none" onClick={copyAiMessage}>
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  Copiar mensagem
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </CardFooter>,
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="card-shadow-sm w-full lg:w-[80%]" ref={ref}>
      <motion.div
        className="w-full"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {elements.map((element, index) => (
          <motion.div key={index} variants={item}>
            {element}
          </motion.div>
        ))}
      </motion.div>
      <Alert message={alertMessage} title="Copiada!" />
    </Card>
  );
};

export default RaidTarget;

const BotMessageSkeleton = () => {
  return (
    <span className="flex flex-col space-y-2">
      <Skeleton className="w-full h-2" />
      <Skeleton className="w-1/2 h-2" />
      <Skeleton className="h-2 w-[10%]" />
    </span>
  );
};
