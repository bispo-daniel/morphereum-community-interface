import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedPProps {
  children: React.ReactNode;
}

const CommunityIntroductionAnimatedP = ({ children }: AnimatedPProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="AnimatedP"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CommunityIntroductionAnimatedP;
