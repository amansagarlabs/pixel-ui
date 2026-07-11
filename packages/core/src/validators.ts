import { PrimitiveSchema, ConfigSchema } from './schema';
import type { Primitive, Config } from './types';

export function validatePrimitive(data: unknown): Primitive {
  return PrimitiveSchema.parse(data);
}

export function validateConfig(data: unknown): Config {
  return ConfigSchema.parse(data);
}

export function isValidPrimitive(data: unknown): boolean {
  try {
    PrimitiveSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

export function isValidConfig(data: unknown): boolean {
  try {
    ConfigSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
