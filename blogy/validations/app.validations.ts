import { z } from "zod";

export const paginationSearchParamsSchema = z.object({
  page: z.string().optional().default("1"),
  field: z.string().optional(),
  order: z.union([z.literal('asc'), z.literal('desc')]).optional().default("asc"),
});