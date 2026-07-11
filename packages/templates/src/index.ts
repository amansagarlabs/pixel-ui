import fs from 'fs-extra';
import path from 'path';

export interface Template {
  name: string;
  description: string;
  files: TemplateFile[];
}

export interface TemplateFile {
  name: string;
  path: string;
  content: string;
}

export async function applyTemplate(template: Template, targetDir: string): Promise<void> {
  await fs.ensureDir(targetDir);
  
  for (const file of template.files) {
    const filePath = path.join(targetDir, file.path);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, file.content);
  }
}

export async function getTemplate(name: string): Promise<Template> {
  // This would fetch from a template registry
  // For now, return a placeholder
  return {
    name,
    description: `Template for ${name}`,
    files: []
  };
}
