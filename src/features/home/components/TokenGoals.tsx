import classNames from "classnames";
import { Minus, Moon } from "lucide-react";

import { TokenGoalsGoal } from ".";

const TokenGoals = ({ celebs }: { celebs?: boolean }) => {
  const priceGoals = [
    {
      price: "$0.34",
      text: "Revelação: quem é o verdadeiro Escolhido?",
      reached: false,
    },
    {
      price: "$0.16",
      text: "Live de invasão à Matrix com Trinity",
      reached: false,
    },
    {
      price: "$0.08",
      text: "Live POV: desvio de balas em slow motion",
      reached: false,
    },
    {
      price: "$0.01",
      text: "Live do banho de cápsula Matrix",
      reached: false,
    },
    { price: "$0.008", text: "Live da festa rave de Zion", reached: false },
    {
      price: "$0.0025",
      text: "Live POV: treino de kung fu com Morpheus",
      reached: false,
    },
    {
      price: "$0.001",
      text: "Live do armamento: 'I need guns. Lots of guns.'",
      reached: true,
    },
    { price: "$0.0005", text: "Live da cozinha do Oráculo", reached: true },
    { price: "$0.00025", text: "Live no esgoto de Zion", reached: true },
    {
      price: "$0.0001",
      text: "Live no sofá da Nave Nabucodonosor",
      reached: true,
    },
  ];

  const celebsGoals = [
    {
      celeb: "@KeanuReeves",
      xLink: "https://x.com/KeanuReeves",
      text: "Sorteio da redpill NFT",
      reached: false,
    },
    {
      celeb: "@Morpheus",
      xLink: "https://x.com/Morpheus",
      text: "Live drop de $Morphereum",
      reached: false,
    },
    {
      celeb: "@trinity_h4x",
      xLink: "https://x.com/trinity_h4x",
      text: "Airdrop da chave da Matrix",
      reached: false,
    },
    {
      celeb: "@AgentSmith",
      xLink: "https://x.com/AgentSmith",
      text: "Sorteio de tokens vírus",
      reached: false,
    },
    {
      celeb: "@oracle_truths",
      xLink: "https://x.com/oracle_truths",
      text: "Libera stake de $Morphereum",
      reached: false,
    },
    {
      celeb: "@theArchitect",
      xLink: "https://x.com/theArchitect",
      text: "Mintagem de MorphePass",
      reached: false,
    },
    {
      celeb: "@elonmusk",
      xLink: "https://x.com/elonmusk",
      text: "Airdrop interplanetário",
      reached: false,
    },
    {
      celeb: "@Gaules",
      xLink: "https://x.com/Gaules",
      text: "Live react com drop",
      reached: false,
    },
    {
      celeb: "@neymarjr",
      xLink: "https://x.com/neymarjr",
      text: "Skin exclusiva $Morphereum",
      reached: true,
    },
  ];

  type Goals = typeof priceGoals | typeof celebsGoals;

  const findLatestReached = (goals: Goals) => {
    return goals.findIndex((goal) => goal.reached === true);
  };

  return (
    <div
      className={classNames({
        "flex flex-col": true,
        "items-end": celebs,
      })}
    >
      <div className="flex flex-col mb-6">
        <h1
          className={classNames({
            "font-[Sour Gummy] select-none text-xl font-bold": true,
            "text-end": celebs,
          })}
        >
          {celebs ? "Celebridades" : "Preço"}
        </h1>

        <p
          className={classNames({
            "select-none text-xs text-muted-foreground": true,
            "text-end": celebs,
          })}
        >
          {celebs ? "Com a #Morphereum" : "Alvos de recompensa"}
        </p>
      </div>

      <Moon
        className={classNames({
          "h-8 w-8 text-foreground": true,
          "-mr-1": celebs,
        })}
      />
      {!celebs &&
        priceGoals.map((goal, index) => (
          <TokenGoalsGoal
            key={index}
            title={goal.price}
            text={goal.text}
            reached={goal.reached}
            isLastestReached={index === findLatestReached(priceGoals)}
            separatorT={index === 0}
            separatorB={index !== 0 || index === 0}
            reverse={celebs}
          />
        ))}

      {celebs &&
        celebsGoals.map((goal, index) => (
          <TokenGoalsGoal
            key={index}
            title={goal.celeb}
            text={goal.text}
            xLink={goal.xLink}
            reached={goal.reached}
            isLastestReached={index === findLatestReached(celebsGoals)}
            separatorT={index === 0}
            separatorB={index !== 0 || index === 0}
            reverse={celebs}
          />
        ))}
      <Minus className="h-6 w-6 text-[var(--coin-pink)]" />
    </div>
  );
};

export default TokenGoals;
