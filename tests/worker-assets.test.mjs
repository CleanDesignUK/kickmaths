import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

test('the packaged Worker serves the approved crest and favicon bytes without text corruption',async()=>{
 execFileSync(process.execPath,['scripts/build-worker.mjs']);
 const {default:worker}=await import('../dist/server/index.js');
 for(const [file,type] of [
  ['kickmaths-crest.png','image/png'],
  ['kickmaths-logo-white.jpg','image/jpeg'],
  ['favicon.ico','image/x-icon'],
 ]){
  const url=`https://kickmaths.example/assets/${file}`;
  const response=await worker.fetch(new Request(url),{});
  assert.equal(response.status,200,file);
  assert.equal(response.headers.get('Content-Type'),type,file);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()),readFileSync(`dist/assets/${file}`),file);
  const head=await worker.fetch(new Request(url,{method:'HEAD'}),{});
  assert.equal(head.headers.get('Content-Type'),type);
  assert.equal((await head.arrayBuffer()).byteLength,0);
 }
 const manifest=await worker.fetch(new Request('https://kickmaths.example/site.webmanifest'),{});
 assert.equal(manifest.headers.get('Content-Type'),'application/manifest+json');
 const {icons}=await manifest.json();
 for(const icon of icons){
  const response=await worker.fetch(new Request(new URL(icon.src,'https://kickmaths.example/')),{});
  assert.equal(response.status,200,icon.src);
  assert.equal(response.headers.get('Content-Type'),'image/png');
 }
});
