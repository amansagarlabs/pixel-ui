export interface SecurityRule {
  id: string;
  name: string;
  type: 'input' | 'output' | 'action';
  pattern: string | RegExp;
  action: 'block' | 'warn' | 'log';
  message: string;
}

export interface SecurityConfig {
  rules: SecurityRule[];
  enabled?: boolean;
  logViolations?: boolean;
}

export interface SecurityCheck {
  passed: boolean;
  rule: SecurityRule;
  input: string;
  timestamp: Date;
}

export interface SecurityGuard {
  checkInput(input: string): SecurityCheck[];
  checkOutput(output: string): SecurityCheck[];
  addRule(rule: SecurityRule): void;
  removeRule(ruleId: string): void;
  getRules(): SecurityRule[];
}
