import { SecurityConfigSchema } from './schema';
import type { SecurityRule, SecurityConfig, SecurityCheck, SecurityGuard } from './types';

export function createSecurityGuard(config: SecurityConfig): SecurityGuard {
  const validatedConfig = SecurityConfigSchema.parse(config);
  const rules = new Map<string, SecurityRule>(validatedConfig.rules.map(r => [r.id, r]));

  function checkContent(content: string, type: SecurityRule['type']): SecurityCheck[] {
    const results: SecurityCheck[] = [];

    for (const rule of rules.values()) {
      if (rule.type !== type) continue;

      const pattern = rule.pattern instanceof RegExp ? rule.pattern : new RegExp(rule.pattern);
      const passed = !pattern.test(content);

      results.push({
        passed,
        rule,
        input: content,
        timestamp: new Date()
      });

      if (!passed && validatedConfig.logViolations) {
        console.warn(`Security violation: ${rule.message}`);
      }
    }

    return results;
  }

  return {
    checkInput(input: string): SecurityCheck[] {
      return checkContent(input, 'input');
    },

    checkOutput(output: string): SecurityCheck[] {
      return checkContent(output, 'output');
    },

    addRule(rule: SecurityRule): void {
      rules.set(rule.id, rule);
    },

    removeRule(ruleId: string): void {
      rules.delete(ruleId);
    },

    getRules(): SecurityRule[] {
      return Array.from(rules.values());
    }
  };
}
