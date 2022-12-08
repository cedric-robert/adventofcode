import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day3() {
  console.log('day3');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './sample'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    let currentLineIndex = 1;

    lines.forEach((line) => {
      console.log(`line ${currentLineIndex++}/${lines.length}: ${line}`);
    });
  } catch (error) {
    console.log(error);
  }
}
