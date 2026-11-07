import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const parts = ['01', '02', '03', '04'].map((part) =>
  path.join(root, 'media_src', 'clean_widescreen.part' + part + '.b64')
);
const output = path.join(root, 'public', 'media', '07_Clean_Widescreen_Footage_42s.mp4');
const expectedSha256 = '9584f2e7947e9cbc60c04e63f7127f76497907b84d3acddfea10117eeb22a714';
const expectedSize = 3253312;

const encoded = parts.map((p) => fs.readFileSync(p, 'utf8').trim()).join('');
const video = Buffer.from(encoded, 'base64');
const actualHash = createHash('sha256').update(video).digest('hex');
if (video.length !== expectedSize || actualHash !== expectedSha256) {
  throw new Error('Chimera video reconstruction failed integrity verification');
}
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, video);
console.log('Chimera self-hosted widescreen film ready:', video.length, 'bytes');

const soundtrackParts = ['01', '02', '03'].map((part) =>
  path.join(root, 'media_src', 'film_with_audio.part' + part + '.b64')
);
const soundtrackOutput = path.join(root, 'public', 'media', '08_Chimera_Product_Film_With_Sound_58s.mp4');
const soundtrackHash = '8f3a1b1dd19189a10e33d782ec9a6fcf8e046deb7e8d0b792e582325c0a742fe';
const soundtrackSize = 2181027;

const soundtrackEncoded = soundtrackParts.map((p) => fs.readFileSync(p, 'utf8').trim()).join('');
const soundtrackVideo = Buffer.from(soundtrackEncoded, 'base64');
const soundtrackActualHash = createHash('sha256').update(soundtrackVideo).digest('hex');
if (soundtrackVideo.length !== soundtrackSize || soundtrackActualHash !== soundtrackHash) {
  throw new Error('Sound-enabled Chimera product film failed integrity verification');
}
fs.writeFileSync(soundtrackOutput, soundtrackVideo);
console.log('Chimera audio-enabled product film ready:', soundtrackVideo.length, 'bytes');
