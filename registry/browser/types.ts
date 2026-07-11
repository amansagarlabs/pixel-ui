export interface BrowserConfig {
  headless?: boolean;
  timeout?: number;
  userAgent?: string;
}

export interface Page {
  url: string;
  title: string;
  content: string;
  links: Link[];
  forms: Form[];
}

export interface Link {
  text: string;
  href: string;
}

export interface Form {
  action: string;
  method: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  type: string;
  value?: string;
}

export interface Browser {
  navigate(url: string): Promise<Page>;
  click(selector: string): Promise<void>;
  fill(selector: string, value: string): Promise<void>;
  submit(selector: string): Promise<void>;
  getContent(): Promise<string>;
  screenshot(): Promise<Buffer>;
  close(): Promise<void>;
}
