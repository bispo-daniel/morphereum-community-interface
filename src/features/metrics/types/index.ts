import { z } from "zod";

export const MetricsSchema = z.object({
  total: z.number(),
  highestCount: z.number(),
  daily: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
    }),
  ),
});

export type Metrics = z.infer<typeof MetricsSchema>;
