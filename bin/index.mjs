#!/usr/bin/env node
import { cp, readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(here, '..', 'templates', 'app');

const [, , targetArg] = process.argv;
if (targetArg === '--help' || targetArg === '-h') {
  console.log('usage: npx create-ovk-app@latest <project-name>');
  process.exit(0);
}

const targetName = targetArg && !targetArg.startsWith('-') ? targetArg : 'ovk-app';
const safeName = targetName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
const targetDir = path.resolve(process.cwd(), safeName);

if (existsSync(targetDir)) {
  const entries = await readdir(targetDir).catch(() => []);
  if (entries.length > 0) {
    console.error(`error: ${safeName} already exists and is not empty`);
    process.exit(1);
  }
}

await cp(templateDir, targetDir, { recursive: true });

for (const relative of ['package.json', 'index.html', 'README.md']) {
  const filePath = path.join(targetDir, relative);
  const content = await readFile(filePath, 'utf8');
  await writeFile(filePath, content.replaceAll('__APP_NAME__', safeName));
}

const line = (text = '') => console.log(text);

line('');
line(`created ${safeName}`);
line('');
line('path map (read this once, then it makes sense):');
line('  src/            the files you edit');
line('  public/         static files copied as-is');
line(`  vite dev        serves src/ at http://localhost:3000 (hot reload, not the final files)`);
line('  dist/           the real output written by npm run build. this is what you deploy');
line('  package.json    scripts you run: dev / build / preview / export');
line('');
line('next commands:');
line(`  cd ${safeName}`);
line('  npm install');
line('  npm run dev        -> open http://localhost:3000, edit src/, page reloads');
line('  npm run build      -> writes dist/ (only after this step do deploy files exist)');
line('  npm run preview    -> serves dist/ at http://localhost:4173 to check the real build');
line('  npm run export     -> packs dist/ into <name>-dist.zip for any static host');
line('  optional: npm run deploy:cloudflare if you want Cloudflare');
line('');
line('rule of thumb: localhost:3000 is a dev server, not a website. dist/ is the website.');
line('dist/ works on any static host: Netlify, Vercel, GitHub Pages, Cloudflare, S3, shared hosting.');
line('');
