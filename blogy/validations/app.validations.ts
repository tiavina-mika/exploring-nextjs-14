import { capitalize } from "string-ts";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from '@/config/zod';
import { EmailFieldSchema } from "./auth.validations";

export const paginationSearchParamsSchema = z.object({
  page: z.string().optional().default("1"),
  field: z.string().optional(),
  order: z.union([z.literal('asc'), z.literal('desc')]).optional().default("asc"),
});

export const ContactSchema = zfd.formData(
  z.object({
    email: EmailFieldSchema,
    subject:  zfd.text(z.string({ errorMap })
      .min(1,'error.required')
      .max(112, 'error.max')
      .transform(capitalize)),
    message: zfd.text(z.string({ errorMap })
      .min(10, 'error.max')
      .max(500, 'error.max')
      .optional()
    ),
  })
);