import { describe, it, expect } from 'vitest';
import { createBrowser } from './browser';

describe('createBrowser', () => {
  it('should create a browser with default config', () => {
    const browser = createBrowser();
    expect(browser).toBeDefined();
  });

  it('should navigate to URL', async () => {
    const browser = createBrowser();
    const page = await browser.navigate('https://example.com');
    
    expect(page.url).toBe('https://example.com');
    expect(page.title).toBeDefined();
    expect(page.content).toBeDefined();
  });

  it('should click element', async () => {
    const browser = createBrowser();
    await expect(browser.click('#button')).resolves.toBeUndefined();
  });

  it('should fill input', async () => {
    const browser = createBrowser();
    await expect(browser.fill('#input', 'value')).resolves.toBeUndefined();
  });

  it('should submit form', async () => {
    const browser = createBrowser();
    await expect(browser.submit('#form')).resolves.toBeUndefined();
  });

  it('should get content', async () => {
    const browser = createBrowser();
    const content = await browser.getContent();
    expect(content).toBeDefined();
  });

  it('should take screenshot', async () => {
    const browser = createBrowser();
    const screenshot = await browser.screenshot();
    expect(screenshot).toBeInstanceOf(Buffer);
  });

  it('should close browser', async () => {
    const browser = createBrowser();
    await expect(browser.close()).resolves.toBeUndefined();
  });
});
