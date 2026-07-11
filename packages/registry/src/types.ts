import { z } from 'zod';

export const PrimitiveMetadataSchema = z.object({
  name: z.string(),
  type: z.literal('agent:primitive').default('agent:primitive'),
  category: z.string(),
  version: z.string(),
  description: z.string(),
  author: z.string().optional(),
  license: z.string().default('MIT'),
  files: z.array(z.union([
    z.string(),
    z.object({
      name: z.string(),
      path: z.string(),
      type: z.enum(['source', 'types', 'schema', 'docs', 'examples', 'test', 'eval', 'config']),
      description: z.string().optional()
    })
  ])).optional().default([]),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  frameworks: z.array(z.string()).optional()
});

export type PrimitiveMetadata = z.infer<typeof PrimitiveMetadataSchema>;

export const ConfigSchema = z.object({
  primitives: z.array(z.string()),
  style: z.string().default('default'),
  TypeScript: z.boolean().default(true),
  registry: z.string().default('https://registry.agentcn.dev'),
  versions: z.record(z.string()).optional()
});

export type Config = z.infer<typeof ConfigSchema>;

export const RegistrySchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  primitives: z.array(PrimitiveMetadataSchema)
});

export type Registry = z.infer<typeof RegistrySchema>;
