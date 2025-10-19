import {
  CommunityIntroductionAnimatedP,
  CommunityIntroductionAnimatedTitle,
} from ".";

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
      <CommunityIntroductionAnimatedTitle>
        <span className="text-center gummy-giga">
          <p>COMUNIDADE</p>
          <p className="text-[var(--coin-pink)]">$Morphereum</p>
        </span>
      </CommunityIntroductionAnimatedTitle>

      <div className="gummy-big flex max-w-[1000px] flex-col items-center justify-center gap-2 lg:gap-4">
        {paragraphs.map((content, index) => (
          <CommunityIntroductionAnimatedP key={index}>
            {content}
          </CommunityIntroductionAnimatedP>
        ))}
      </div>
    </div>
  );
};

export default CommunityIntroduction;
