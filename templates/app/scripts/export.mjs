import { createWriteStream } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { deflateRawSync } from 'node:zlib';

const root = process.cwd();
const distDir = path.join(root, 'dist');

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push({ full, rel: path.relative(base, full).split(path.sep).join('/') });
  }
  return out;
}

let files;
try {
  files = await walk(distDir);
} catch (_error) {
  console.error('dist/ not found. run "npm run build" first.');
  process.exit(1);
}
if (files.length === 0) {
  console.error('dist/ is empty. run "npm run build" first.');
  process.exit(1);
}

const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = -1;
  for (let i = 0; i < buffer.length; i += 1) c = crcTable[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

const chunks = [];
const central = [];
let offset = 0;

for (const file of files) {
  const data = await readFile(file.full);
  const compressed = deflateRawSync(data, { level: 9 });
  const nameBuf = Buffer.from(file.rel, 'utf8');
  const crc = crc32(data);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6);
  local.writeUInt16LE(8, 8);
  local.writeUInt16LE(0, 10);
  local.writeUInt16LE(0, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(compressed.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);

  chunks.push(local, nameBuf, compressed);

  const dir = Buffer.alloc(46);
  dir.writeUInt32LE(0x02014b50, 0);
  dir.writeUInt16LE(20, 4);
  dir.writeUInt16LE(20, 6);
  dir.writeUInt16LE(0x0800, 8);
  dir.writeUInt16LE(8, 10);
  dir.writeUInt16LE(0, 12);
  dir.writeUInt16LE(0, 14);
  dir.writeUInt32LE(crc, 16);
  dir.writeUInt32LE(compressed.length, 20);
  dir.writeUInt32LE(data.length, 24);
  dir.writeUInt16LE(nameBuf.length, 28);
  dir.writeUInt16LE(0, 30);
  dir.writeUInt16LE(0, 32);
  dir.writeUInt16LE(0, 34);
  dir.writeUInt16LE(0, 36);
  dir.writeUInt32LE(0, 38);
  dir.writeUInt32LE(offset, 42);
  central.push(dir, nameBuf);

  offset += local.length + nameBuf.length + compressed.length;
}

const centralBuf = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(0, 4);
end.writeUInt16LE(0, 6);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBuf.length, 12);
end.writeUInt32LE(offset, 16);
end.writeUInt16LE(0, 20);

const name = (await readFile(path.join(root, 'package.json'), 'utf8'));
const appName = JSON.parse(name).name || 'app';
const outPath = path.join(root, `${appName}-dist.zip`);

await new Promise((resolve, reject) => {
  const stream = createWriteStream(outPath);
  stream.on('error', reject);
  stream.on('close', resolve);
  for (const chunk of chunks) stream.write(chunk);
  stream.write(centralBuf);
  stream.write(end);
  stream.end();
});

const size = (await stat(outPath)).size;
console.log(`wrote ${path.basename(outPath)} (${files.length} files, ${(size / 1024).toFixed(1)} kB)`);
console.log('upload that zip to any static host, or point the host at dist/ directly');
