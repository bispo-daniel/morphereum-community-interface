import classNames from "classnames";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { Separator } from "@/components/ui/separator";

const TokenGoal = ({
  title,
  text,
  xLink,
  separatorB,
  separatorT,
  reverse,
  reached,
  isLastestReached,
}: {
  title: string;
  text: string;
  xLink?: string;
  separatorB?: boolean;
  separatorT?: boolean;
  reverse?: boolean;
  reached?: boolean;
  isLastestReached?: boolean;
}) => {
  const openLink = () => (xLink ? window.open(xLink, "_blank") : null);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={classNames({
        "flex gap-4": true,
        "flex-row-reverse": reverse,
      })}
    >
      <div className="flex flex-col items-center">
        {separatorT && (
          <Separator
            orientation="vertical"
            className={classNames({
              "my-2 h-16 w-1 rounded md:h-8": true,
              "bg-primary": !reached,
              "bg-[var(--coin-pink)]": reached,
            })}
          />
        )}

        <Rocket
          className={classNames({
            "h-6 w-6": true,
            "text-primary": !reached,
            "text-[var(--coin-pink)]": reached,
            "animate-bounce": isLastestReached,
          })}
        />

        {separatorB && (
          <Separator
            orientation="vertical"
            className={classNames({
              "my-2 h-16 w-1 rounded md:h-8": true,
              "bg-primary": !reached,
              "bg-[var(--coin-pink)]": reached,
            })}
          />
        )}
      </div>
      <div
        className={classNames({
          "flex flex-col": true,
          "mt-20 md:mt-12": separatorT,
          "text-end": xLink,
        })}
      >
        <span
          className={classNames({
            "select-none text-sm font-semibold": true,
            "hover:cursor-pointer hover:underline": xLink,
          })}
          onClick={openLink}
        >
          {title}
        </span>
        <span
          className="mt-2 max-w-[120px] select-none hyphens-auto break-words text-xs text-muted-foreground sm:max-w-full md:mt-0"
          lang="pt-br"
        >
          {text}
        </span>
      </div>
    </motion.div>
  );
};

export default TokenGoal;
