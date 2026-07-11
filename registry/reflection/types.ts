export interface Reflection {
  id: string;
  input: unknown;
  output: unknown;
  critique: string;
  score: number;
  suggestions: string[];
  timestamp: Date;
}

export interface ReflectionConfig {
  maxIterations?: number;
  threshold?: number;
}

export interface Reflector {
  reflect(input: unknown, output: unknown): Promise<Reflection>;
  critique(reflection: Reflection): Promise<string[]>;
  improve(reflection: Reflection, suggestions: string[]): Promise<unknown>;
}
