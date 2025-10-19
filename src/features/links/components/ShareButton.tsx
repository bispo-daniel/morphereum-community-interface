import classNames from "classnames";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert } from "@/components";
import IconMap from "@/components/IconMap";

import { useRegisterLinkAccess } from "../api/registerLinkAccess";

type ShareButtonProps = {
  linkId: string;
  icon: string;
  platform: string;
  url: string;
};

const ShareButton = ({ linkId, icon, platform, url }: ShareButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { mutate } = useRegisterLinkAccess();

  const calculateIsMobile = () => {
    const mobile = window.innerWidth < 768;

    const getIsMobile = (): boolean => {
      if (mobile) return true;
      return false;
    };

    setIsMobile(getIsMobile());
  };

  useEffect(() => {
    calculateIsMobile();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateIsMobile, 150);
    };

    let timeoutId: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openLink = () => {
    mutate(linkId);
    window.open(url, "_blank");
  };

  const copyLink = () => {
    mutate(linkId);

    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setAlertMessage("O link foi copiado para a área de transferência.");

    setTimeout(() => {
      setAlertMessage("");
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="m-2 flex select-none items-center justify-between rounded px-4 py-2 transition-colors hover:bg-[hsl(var(--hover-shade))]">
      <button
        className="rounded border p-1.5 hover:bg-accent hover:text-accent-foreground"
        onClick={openLink}
      >
        <IconMap icon={icon} size={16} />
      </button>

      <p
        className="shrink grow overflow-hidden truncate text-ellipsis whitespace-nowrap pl-2 text-sm hover:cursor-pointer hover:underline"
        onClick={openLink}
      >
        {platform}
      </p>

      <div className="flex shrink-0 items-center gap-2">
        <button
          className="rounded border p-1.5 hover:bg-accent hover:text-accent-foreground"
          onClick={copyLink}
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <button
          className={classNames({
            "rounded border p-1.5 hover:bg-accent hover:text-accent-foreground":
              true,
            "px-3 text-sm": !isMobile,
          })}
          onClick={openLink}
        >
          {isMobile ? <ExternalLink size={16} /> : "Abrir link"}
        </button>
      </div>

      <Alert message={alertMessage} title={"Copiado!"} />
    </div>
  );
};

export default ShareButton;
