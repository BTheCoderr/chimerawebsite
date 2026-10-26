import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const home = read('app/page.tsx');
const care = read('app/care/page.tsx');
const errors = [];

for (const [name, source] of [['homepage', home], ['care', care]]) {
  const images = [...source.matchAll(/(?:src|href)="(\/images\/[^"]+)"/g)].map((m) => m[1]);
  for (const image of images) {
    if (!fs.existsSync(path.join(root, 'public', image.slice(1)))) errors.push(name + ': missing ' + image);
  }
  if (!source.includes('BAHEEM FERRELL')) errors.push(name + ': missing developer credit');
  if (!source.includes('SCOTT KEELEY')) errors.push(name + ': missing inventor credit');
}

const photos = [...home.matchAll(/src="(\/images\/[^"]+\.(?:jpg|jpeg|webp|png))"/g)].map((m) => m[1]);
if (photos.length !== new Set(photos).size) errors.push('Homepage repeats a product photo');
for (const fragment of ['id="film"', 'id="collection"', 'youtube-nocookie.com', 'Ceramic insert', 'Carbon refills']) {
  if (!home.includes(fragment)) errors.push('Missing key homepage section: ' + fragment);
}
for (const file of ['public/robots.txt', 'public/sitemap.xml', 'app/icon.svg']) {
  if (!fs.existsSync(path.join(root, file))) errors.push('Missing metadata asset: ' + file);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (/\.(docx?|pdf|eps|xlsx?|pptx?)$/i.test(entry.name)) {
      errors.push('Unapproved document in public assets: ' + path.relative(root, absolute));
    }
  }
}
walk(path.join(root, 'public/images'));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Chimera static audit passed: pages, unique photos, credits and public assets.');
