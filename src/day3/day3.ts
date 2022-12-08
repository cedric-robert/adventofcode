import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day3() {
  console.log('day3');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './sample'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    const currentLineIndex = 1;

    lines.forEach((line) => {
      /* console.log(`line ${currentLineIndex++}/${lines.length}: ${line}`); */
      const first = Array.from(line.slice(0, line.length / 2));
      const second = Array.from(line.slice(line.length / 2));
      const common = first.filter((charFirst) => second.find((charSecond) => charSecond === charFirst))[0];
      console.log(`first ${first}  second ${second}  common ${common}`);
    });
  } catch (error) {
    console.log(error);
  }
}
