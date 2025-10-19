import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import AnimatedTitle from "./AnimatedTitle";

interface LinkProps {
  content: string;
  path: string;
}

interface TextSectionProps {
  animatedTitle: {
    text: string;
    reverse?: boolean;
    tilted?: boolean;
  };
  paragraphs: string[];
  link: LinkProps;
}

const TextSection = ({ animatedTitle, paragraphs, link }: TextSectionProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <AnimatedTitle
        text={animatedTitle.text}
        reverse={animatedTitle.reverse}
        tilted={animatedTitle.tilted}
      />

      <div className="gummy-big flex max-w-[1000px] flex-col items-center justify-center gap-2 text-center lg:gap-4">
        {paragraphs.map((p, index) => (
          <AnimatedP key={index} phrase={p} />
        ))}
      </div>

      {link.content && link.path && (
        <p className="text-center gummy-big">
          <Link
            to={link.path}
            className="text-[var(--coin-purple)] transition-all hover:underline dark:text-[var(--coin-font)]"
          >
            <AnimatedP phrase={link.content} />
          </Link>
        </p>
      )}
    </div>
  );
};

export default TextSection;

const AnimatedP = ({ phrase }: { phrase: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.span
      ref={ref}
      className="AnimatedP"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
    >
      {phrase}
    </motion.span>
  );
};
