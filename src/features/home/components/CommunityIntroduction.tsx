import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedTitleProps {
  children: React.ReactNode;
}

const AnimatedTitle = ({ children }: AnimatedTitleProps) => {
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

interface AnimatedPProps {
  children: React.ReactNode;
}

const AnimatedP = ({ children }: AnimatedPProps) => {
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

const CommunityIntroduction = () => {
  const paragraphs = [
    <>
      Você sente que tem algo errado com o sistema? Talvez seja hora de acordar
      para o <span className="text-[var(--coin-pink)]">$Morphereum</span>.
    </>,
    <>
      Essa não é só uma moeda. É o código por trás da Matrix:{" "}
      <span className="text-[var(--coin-pink)]">$Morphereum</span>.
    </>,
    <>
      Depois da primeira dose de{" "}
      <span className="text-[var(--coin-pink)]">$Morphereum</span>, não tem
      volta. A realidade muda. Você muda.
    </>,
    <>
      A Matrix é real. Mas com{" "}
      <span className="text-[var(--coin-pink)]">$Morphereum</span>, você
      controla o jogo – e reescreve as regras.
    </>,
    <>
      A simulação tá{" "}
      <span className="animate-pulse text-[var(--coin-pink)]">falhando</span>.{" "}
      <span className="text-[var(--coin-pink)]">$Morphereum</span> é o glitch.
      Você escolhe: continuar dormindo ou entrar.
    </>,
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 rounded-[12px] bg-transparent bg-opacity-20 py-8 text-center backdrop-blur-md backdrop-filter lg:gap-12 lg:px-8 lg:py-16">
      <AnimatedTitle>
        <span className="gummy-giga text-center">
          <p>COMUNIDADE</p>
          <p className="text-[var(--coin-pink)]">$Morphereum</p>
        </span>
      </AnimatedTitle>

      <div className="gummy-big flex max-w-[1000px] flex-col items-center justify-center gap-2 lg:gap-4">
        {paragraphs.map((content, index) => (
          <AnimatedP key={index}>{content}</AnimatedP>
        ))}
      </div>
    </div>
  );
};

export default CommunityIntroduction;
