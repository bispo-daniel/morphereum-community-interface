import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";

import geography from "@/assets/mapGeography/index.json";

import { useVisitsByCountry } from "../api/visits/getVisitsByCountry";

const VisitsByCountryMap = ({
  setTooltipContent,
}: {
  setTooltipContent: (content: string) => void;
}) => {
  const { data: visitsByCountry } = useVisitsByCountry();

  const [colorStart, colorEnd] = useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    return [
      styles.getPropertyValue("--coin-pink").trim(),
      styles.getPropertyValue("--coin-font").trim(),
    ];
  }, []);

  const colorScale = scaleLinear<string>()
    .domain([0, visitsByCountry?.highestCount || 0])
    .range([colorStart, colorEnd]);

  const countryVisitsMap = useMemo(() => {
    if (!visitsByCountry) return new Map<string, number>();
    return new Map(
      visitsByCountry.countries.map(({ country, count }) => [country, count]),
    );
  }, [visitsByCountry]);

  return (
    <div data-tip="" className="max-h-[600px]">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        className="lg:px-16"
        height={450}
      >
        <Sphere
          stroke="hsl(var(--map-lines))"
          strokeWidth={0.5}
          id={"0"}
          fill={"transparent"}
        />
        <Graticule stroke="hsl(var(--map-lines))" strokeWidth={0.5} />

        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const visitCount = countryVisitsMap.get(countryName) || 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={visitCount ? colorScale(visitCount) : "#eeeeee"}
                  stroke="#E4E5E6"
                  strokeWidth={0.5}
                  className="hover:cursor-pointer"
                  onMouseEnter={() => {
                    setTooltipContent(`${countryName} ${visitCount} visitas`);
                  }}
                  onMouseLeave={() => setTooltipContent("")}
                  data-tooltip-id="my-tooltip"
                  style={{
                    default: { outline: "none" },
                    hover: {
                      outline: "none",
                      fill: colorStart,
                      transitionDuration: "0.5s",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default VisitsByCountryMap;
