import { useEffect } from "react";
import Marquee from "react-fast-marquee";

import { morpheusImg } from "@/assets/images";

import {
  AnimatedSeparators,
  AuroraTitle,
  Chart,
  CoinImageMarquee,
  CommunityIntroduction,
  MatrixRainingCode,
  RotatingCoinCanvas,
  TextSection,
  TokenGoals,
} from "./components";

const Home = () => {
  useEffect(() => {
    document.title = "Comunidade $Morphereum";

    return () => {
      document.title = "Comunidade $Morphereum";
    };
  }, []);

  return (
    <div className="flex flex-col items-center pt-12 overflow-x-hidden">
      <MatrixRainingCode />

      <div className="relative w-full min-h-screen mb-12">
        <div className="relative flex items-end justify-center w-full min-h-screen z-1">
          <img
            src={morpheusImg}
            alt=""
            className="w-[850px] max-w-full select-none"
            draggable={false}
          />
        </div>

        <div className="bg-red h-[30px] border-y-2 border-[var(--coin-pink)] backdrop-blur-md backdrop-filter">
          <Marquee className="bg-red h-[30px] overflow-hidden">
            <p className="text-xl font-bold select-none">
              This is your last chance. After this, there is no turning back.
              You take the Bitcoin – the story ends, you wake up in your bed and
              believe whatever you want to believe. You take the $Morphereum –
              you stay in Wonderland, and I show you how deep the rabbit hole
              goes. Remember, all I'm offering is the truth. Nothing more.
            </p>
          </Marquee>
        </div>
      </div>

      <div className="w-full px-4 lg:px-12">
        <CommunityIntroduction />
      </div>

      <CoinImageMarquee />

      <div className="flex flex-col items-center justify-center w-full gap-6 mb-12 lg:gap-12">
        <TextSection
          animatedTitle={{ text: "RAAAIDS" }}
          paragraphs={[
            "Participe dos nossos RAIDS diários e ajude a fortalecer nossa comunidade!",
            "Divulgue o $Morphereum e faça parte do movimento!",
          ]}
          link={{ content: "Clique aqui e comece agora!", path: "/raid" }}
        />
        <TextSection
          animatedTitle={{ text: "LIIINNKS", reverse: true }}
          paragraphs={[
            "Explore links úteis relacionados à $Morphereum.",
            "Acesse informações importantes e conecte-se à comunidade!",
          ]}
          link={{ content: "Clique aqui e acesse os links!", path: "/links" }}
        />
        <TextSection
          animatedTitle={{ text: "MatrixCHAT" }}
          paragraphs={[
            "Utilize o MatrixCHAT",
            "Gere trocadilhos e piadas ruins!",
          ]}
          link={{ content: "Entre no chat agora!", path: "/chat" }}
        />
        <TextSection
          animatedTitle={{ text: "MEETRICASS", reverse: true }}
          paragraphs={[
            "Acompanhe as métricas e resultados das campanhas do $Morphereum & comunidade.",
            "Veja o impacto que estamos gerando juntos!",
          ]}
          link={{ content: "Veja as métricas aqui!", path: "/metrics" }}
        />
        <TextSection
          animatedTitle={{ text: "WHITEPAPER" }}
          paragraphs={[
            "Entenda a base técnica e a visão por trás do projeto $Morphereum.",
            "Descubra como estamos transformando ideias em realidade!",
          ]}
          link={{ content: "Leia o whitepaper completo!", path: "/whitepaper" }}
        />
        <TextSection
          animatedTitle={{ text: "MEMES & ARTS", reverse: true }}
          paragraphs={[
            "Inspire-se com memes e artes criados pela comunidade!",
            "Contribua com sua criatividade e ajude a divulgar o $Morphereum.",
          ]}
          link={{ content: "Veja e crie agora!", path: "/arts" }}
        />
      </div>

      <div className="relative mb-[310px] h-8 w-full bg-black pt-8 dark:bg-[var(--coin-pink)]">
        <CoinImageMarquee upSideDown />

        <div className="absolute left-1/2 top-0 z-[-1] h-[225px] w-[8px] -translate-x-1/2 rounded bg-gradient-to-r from-[rgba(0,0,0,0.0)] via-[var(--coin-pink)] to-[rgba(0,0,0,0.0)]" />

        <RotatingCoinCanvas />
      </div>

      <div className="flex flex-col items-center w-full gap-12 mb-12">
        <AuroraTitle />
        <div className="flex w-[95%] justify-between overflow-clip rounded-[12px] bg-transparent bg-opacity-20 p-4 backdrop-blur-md backdrop-filter md:w-[90%] md:p-8">
          <TokenGoals />
          <TokenGoals celebs />
        </div>
      </div>

      <div className="flex flex-col w-full mb-12">
        <AnimatedSeparators baseVelocity={1} />
      </div>

      <div className="h-[500px] w-full px-4">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
