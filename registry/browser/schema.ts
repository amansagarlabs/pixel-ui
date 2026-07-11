import { z } from 'zod';

export const BrowserConfigSchema = z.object({
  headless: z.boolean().optional().default(true),
  timeout: z.number().optional().default(30000),
  userAgent: z.string().optional()
});

export const LinkSchema = z.object({
  text: z.string(),
  href: z.string()
});

export const FormFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string().optional()
});

export const FormSchema = z.object({
  action: z.string(),
  method: z.string(),
  fields: z.array(FormFieldSchema)
});

export const PageSchema = z.object({
  url: z.string(),
  title: z.string(),
  content: z.string(),
  links: z.array(LinkSchema),
  forms: z.array(FormSchema)
});
