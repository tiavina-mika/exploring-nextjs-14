import { z } from "zod";

export const paginationSearchParamsSchema = z.object({
  page: z.string().optional().default("1"),
});