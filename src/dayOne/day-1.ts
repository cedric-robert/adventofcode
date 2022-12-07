import { promises as fsPromises } from 'fs';
import path from 'path';

export async function dayOne() {
  console.log('dayOne');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input-1-1'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      console.log(`line: ${line}`);
    });
  } catch (error) {
    console.log(error);
  }
}
