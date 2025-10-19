import classNames from "classnames";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedTitle = ({
  text,
  reverse,
  tilted,
}: {
  text: string;
  reverse?: boolean;
  tilted?: boolean;
}) => {
  const { ref } = useInView({ triggerOnce: false, threshold: 0.45 });
  const { scrollY } = useScroll();
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const [offsetTop, setOffsetTop] = useState(0);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    if (paragraphRef.current) {
      const elementTop = paragraphRef.current.getBoundingClientRect().top;
      const scrollYValue = window.scrollY;
      const offsetTopValue = scrollYValue + elementTop - 250;

      setOffsetTop(offsetTopValue);
    }
  }, []);

  const animationDirection = reverse
    ? [screenWidth, -screenWidth]
    : [-screenWidth, screenWidth];

  const xTransform = useTransform(
    scrollY,
    [offsetTop - 250, offsetTop + window.innerHeight],
    animationDirection,
  );

  const rotate = tilted ? (reverse ? 5 : -5) : 0;

  return (
    <motion.div
      ref={paragraphRef}
      className={classNames({ "mb-6 mt-24": tilted })}
    >
      <motion.p
        ref={ref}
        style={{ x: xTransform, rotate }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="gummy-giga mb-6 w-screen bg-black text-center text-[hsl(var(--background))] mix-blend-darken dark:bg-[var(--coin-pink)] dark:mix-blend-lighten lg:mb-12"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedTitle;
