import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { sortByDate } from "@/utils/sortByDate";

import { useArtsMetrics } from "./api/arts/getArtsMetrics";
import { useArtsProducersNumber } from "./api/arts/getArtsProducers.Number";
import { useArtsProducersTrending } from "./api/arts/getArtsProducersTrending";
import { useChatMetrics } from "./api/chat/getChatMetrics";
import { useChatRaidMessagesMetrics } from "./api/chat/getChatRaidMessagesMetrics";
import { useLinksMetrics } from "./api/links/getLinksMetrics";
import { useLinksTrendingMetrics } from "./api/links/getLinksTrendingMetrics";
import { useRaidsMetrics } from "./api/raids/getRaidsMetrics";
import { useRaidsTrendingMetrics } from "./api/raids/getRaidsTrendingMetrics";
import { useVisitsMetrics } from "./api/visits/getVisitsMetrics";
import Chart from "./components/Chart";
import MarqueeSkeleton from "./components/MarqueeSkeleton";
import TrendingMetricsMarquee from "./components/TrendingMetricsMarquee";
import VisitsByCountryMap from "./components/VisitsByCountryMap";

const Metrics = () => {
  useEffect(() => {
    document.title = "Comunidade $Morphereum – Métricas";

    return () => {
      document.title = "Comunidade $Morphereum";
    };
  }, []);

  const { data: visitsMetrics } = useVisitsMetrics();
  const sortedVisitsMetrics = sortByDate(
    visitsMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: raidsMetrics } = useRaidsMetrics();
  const sortedRaidsMetrics = sortByDate(
    raidsMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: chatRaidMessagesMetrics } = useChatRaidMessagesMetrics();
  const sortedChatRaidMessagesMetrics = sortByDate(
    chatRaidMessagesMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const {
    data: raidsTrendingMetrics,
    isError: raidsTrendingMetricsIsError,
    isPending: raidsTrendingMetricsIsPending,
  } = useRaidsTrendingMetrics();

  const { data: linksMetrics } = useLinksMetrics();
  const sortedLinksMetrics = sortByDate(
    linksMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const {
    data: linksTrendingMetrics,
    isError: linksTrendingMetricsIsError,
    isPending: linksTrendingMetricsIsPending,
  } = useLinksTrendingMetrics();

  const { data: chatMetrics } = useChatMetrics();
  const sortedChatMetrics = sortByDate(
    chatMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: artsMetrics } = useArtsMetrics();
  const sortedArtsMetrics = sortByDate(
    artsMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: artsProducersNumber } = useArtsProducersNumber();

  const {
    data: artsProducersTrending,
    isError: artsProducersTrendingIsError,
    isPending: artsProducersTrendingIsPending,
  } = useArtsProducersTrending();

  const [mapTooltipContent, setMapTooltipContent] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full gap-12 mt-12">
      <h1 className="mt-2 text-xl italic font-normal select-none md:text-3xl">
        Métricas da comunidade
      </h1>

      <div className="w-full h-full px-4 space-y-12 lg:px-12">
        <h2 className="text-lg italic font-normal select-none md:text-xl">
          📌 Visitas - Total {visitsMetrics?.total || 0}
        </h2>

        <div className="w-full lg:px-12">
          <Chart
            data={sortedVisitsMetrics.daily || []}
            max={sortedVisitsMetrics.highestCount || 0}
          />
        </div>
      </div>

      <div className="w-full h-full px-4 space-y-12 lg:px-12">
        <h2 className="text-lg italic font-normal select-none md:text-xl">
          🌎 Visitas por país
        </h2>

        <VisitsByCountryMap setTooltipContent={setMapTooltipContent} />
        <Tooltip
          id="my-tooltip"
          float
          style={{ marginTop: "-4px" }}
          className="top-0 select-none"
        >
          {mapTooltipContent}
        </Tooltip>
      </div>

      <div className="w-full h-full px-4 space-y-12 lg:px-12">
        <h2 className="text-lg italic font-normal select-none md:text-xl">
          🎯 Raids
        </h2>

        <div className="flex flex-col items-center justify-between w-full gap-8 md:flex-row lg:px-12">
          <div className="flex flex-col w-full md:w-1/2">
            <p className="pb-8 text-lg italic font-light select-none">
              • Acessos aos raids - Total {sortedRaidsMetrics.total} (7d)
            </p>
            <Chart
              data={sortedRaidsMetrics.daily || []}
              max={sortedRaidsMetrics.highestCount || 0}
            />
          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <p className="pb-8 text-xl italic font-light select-none">
              • Mensagens geradas IA - Total{" "}
              {sortedChatRaidMessagesMetrics.total} (7d)
            </p>
            <Chart
              data={sortedChatRaidMessagesMetrics.daily || []}
              max={sortedChatRaidMessagesMetrics.highestCount || 0}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        {raidsTrendingMetricsIsError ||
        raidsTrendingMetricsIsPending ||
        !raidsTrendingMetrics?.raids ||
        raidsTrendingMetrics.raids.length === 0 ? (
          <MarqueeSkeleton />
        ) : (
          <TrendingMetricsMarquee raids={raidsTrendingMetrics?.raids || []} />
        )}
      </div>

      <div className="w-full h-full px-4 space-y-12 lg:px-12">
        <h2 className="text-lg italic font-normal select-none md:text-xl">
          🔗 Links - Total {sortedLinksMetrics.total} (7d)
        </h2>

        <div className="w-full lg:px-12">
          <Chart
            data={sortedLinksMetrics.daily || []}
            max={sortedLinksMetrics.highestCount || 0}
          />
        </div>
      </div>

      <div className="w-full">
        {linksTrendingMetricsIsError ||
        linksTrendingMetricsIsPending ||
        !linksTrendingMetrics?.links ||
        linksTrendingMetrics.links.length === 0 ? (
          <MarqueeSkeleton />
        ) : (
          <TrendingMetricsMarquee links={linksTrendingMetrics?.links || []} />
        )}
      </div>

      <div className="w-full h-full px-4 space-y-12 lg:px-12">
        <h2 className="text-lg italic font-normal select-none md:text-xl">
          🤖 Chat - Total {sortedChatMetrics.total} (7d)
        </h2>

        <div className="w-full lg:px-12">
          <Chart
            data={sortedChatMetrics.daily || []}
            max={sortedChatMetrics.highestCount || 0}
          />
        </div>
      </div>

      <div className="w-full h-full px-4 space-y-12 lg:px-12">
        <h2 className="text-lg italic font-normal select-none md:text-xl">
          🎨 Artes & memes - Total {sortedArtsMetrics.total} (7d)
        </h2>

        <div className="w-full lg:px-12">
          <Chart
            data={sortedArtsMetrics.daily || []}
            max={sortedArtsMetrics.highestCount || 0}
          />
        </div>
      </div>

      <div className="w-full px-4 text-2xl text-center text-gummy lg:text-4xl">
        <p>
          {(artsProducersNumber?.producers || 0) + " "}
          <span className="animate-pulse text-[var(--coin-purple)] dark:text-[var(--coin-font)]">
            degens
          </span>{" "}
          já postaram {artsProducersNumber?.arts || 0} memes aqui na comunidade!
        </p>
        <p>
          <Link
            to="/arts"
            className="text-[var(--coin-purple)] transition-all hover:underline dark:text-[var(--coin-font)]"
          >
            Clique aqui e faça parte!
          </Link>
        </p>
      </div>

      <div className="w-full">
        {artsProducersTrendingIsError ||
        artsProducersTrendingIsPending ||
        !artsProducersTrending?.producers ||
        artsProducersTrending.producers.length === 0 ? (
          <MarqueeSkeleton />
        ) : (
          <TrendingMetricsMarquee
            producers={artsProducersTrending?.producers || []}
          />
        )}
      </div>
    </div>
  );
};

export default Metrics;
