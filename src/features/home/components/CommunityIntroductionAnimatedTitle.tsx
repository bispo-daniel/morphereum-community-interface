import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CommunityIntroductionAnimatedTitleProps {
  children: React.ReactNode;
}

const CommunityIntroductionAnimatedTitle = ({
  children,
}: CommunityIntroductionAnimatedTitleProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="AnimatedTitle"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CommunityIntroductionAnimatedTitle;
