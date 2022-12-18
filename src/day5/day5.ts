import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day5() {
  console.log('day5');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input.txt'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    readInputColumnConfig(lines);

    lines.forEach((line) => {
      /* console.log(`reading '${line}'`); */
    });
  } catch (error) {
    console.error(error);
  }
}

function readInputColumnConfig(lines: string[]): [number[]] {
  const columnConfig: [number[]] = [[]];
  // reading max height
  let lineIndex = 0;
  let line = '';
  while (!line.startsWith(' 1')) {
    line = lines[lineIndex++];
    console.log(line);
  }
  const maxHeight = lineIndex - 1;
  // reading nb columns
  const nbColumns = parseInt(line.slice(line.lastIndexOf('   ')));
  console.log(`maxHeight ${maxHeight} nbColumns ${nbColumns}`);
  return columnConfig;
}
