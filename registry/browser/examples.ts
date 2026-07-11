import { createBrowser } from './browser';

// Example 1: Basic navigation
async function basicNavigation() {
  const browser = createBrowser();
  
  const page = await browser.navigate('https://example.com');
  console.log('Page title:', page.title);
  console.log('Page content:', page.content.substring(0, 100));
  
  await browser.close();
}

// Example 2: Form interaction
async function formInteraction() {
  const browser = createBrowser();
  
  await browser.navigate('https://example.com/form');
  await browser.fill('#name', 'John Doe');
  await browser.fill('#email', 'john@example.com');
  await browser.submit('#contact-form');
  
  await browser.close();
}

// Example 3: Taking screenshots
async function takeScreenshots() {
  const browser = createBrowser();
  
  await browser.navigate('https://example.com');
  const screenshot = await browser.screenshot();
  
  // Save screenshot to file
  const fs = require('fs');
  fs.writeFileSync('screenshot.png', screenshot);
  
  await browser.close();
}

export { basicNavigation, formInteraction, takeScreenshots };
