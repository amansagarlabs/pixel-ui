export interface PrimitiveFile {
  name: string;
  path: string;
  type: 'source' | 'types' | 'schema' | 'test' | 'eval' | 'docs' | 'examples' | 'config';
  content?: string;
}

export type PrimitiveFileReference = PrimitiveFile | string;

export interface PrimitiveContext {
  name: string;
  version: string;
  description: string;
  files: PrimitiveFileReference[];
  dependencies?: string[];
  devDependencies?: string[];
}

export interface InstallOptions {
  registry?: string;
  force?: boolean;
  skipDependencies?: boolean;
}

export interface RegistryConfig {
  url: string;
  cacheDir?: string;
  timeout?: number;
}

export interface Primitive {
  name: string;
  type?: 'agent:primitive';
  category: string;
  version: string;
  description: string;
  author?: string;
  license?: string;
  files: PrimitiveFileReference[];
  dependencies?: string[];
  devDependencies?: string[];
  tags?: string[];
  frameworks?: string[];
}

export interface Config {
  primitives: string[];
  style?: string;
  TypeScript?: boolean;
  registry?: string;
  versions?: Record<string, string>;
}
