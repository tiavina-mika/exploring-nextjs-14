import { capitalize } from "string-ts";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from '@/config/zod/zod';
import { EmailFieldSchema } from "./auth.validations";

export const paginationSearchParamsSchema = z.object({
  page: z.string().optional().default("1"),
  field: z.string().optional(),
  order: z.union([z.literal('asc'), z.literal('desc')]).optional().default("asc"),
});

export const ContactSchema = zfd.formData(
  z.object({
    email: EmailFieldSchema,
    name:  zfd.text(z.string({ errorMap })
      .max(112, 'error.max')
      .transform(capitalize)),
    message: zfd.text(z.string({ errorMap })
      .min(10, 'error.max')
      .max(500, 'error.max')
      .optional()
    ),
  })
);

export const MultipleSelectSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const idSchema = z.string({ errorMap }).min(1, 'error.dataNotExist');
