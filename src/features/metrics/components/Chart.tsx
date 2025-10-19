import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Quantidade",
    color: "var(--coin-pink)",
  },
} satisfies ChartConfig;

const Chart = ({
  max,
  data,
}: {
  max: number;
  data: { date: string; count: number }[];
}) => {
  const [yAxisWidth, setYAxisWidth] = useState(40);

  const calculateYAxisWidth = () => {
    const mobile = window.innerWidth < 768;
    const tablet = window.innerWidth < 1024;

    const getYAxisWidth = (): number => {
      if (mobile) return 1;
      if (tablet) return 30;
      return 40;
    };

    setYAxisWidth(getYAxisWidth());
  };

  useEffect(() => {
    calculateYAxisWidth();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateYAxisWidth, 150);
    };

    let timeoutId: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="select-none"
      style={{ height: 300, width: "100%" }}
    >
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        <YAxis domain={[0, max + max * 0.1]} width={yAxisWidth} />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 2)}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        <defs>
          <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-count)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-count)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="count"
          type="monotone"
          fill="url(#fillCount)"
          fillOpacity={0.4}
          stroke="var(--color-count)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default Chart;
