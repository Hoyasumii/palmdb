import { createReadStream, createWriteStream, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import zlib from 'node:zlib';



const input = createReadStream('testing.msgpack');
const output = createWriteStream('testing.msgpack.gz');

const gzip = zlib.createGzip({
  level: 9, // nível de compressão (0 = sem compressão, 9 = máximo)
  strategy: zlib.constants.Z_DEFAULT_STRATEGY
});

input.pipe(gzip).pipe(output);
// writeFileSync("testing.msgpack.gz", zlib.gzipSync(await readFile("testing.msgpack", {

  
// })))
