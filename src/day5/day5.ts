import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day5() {
  console.log('day5');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input.txt'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    const colNumberPositions = readInputColumnConfig(lines);
    let columns = initializeColumns(lines, colNumberPositions);
    console.log('before', columns);
    columns = readMoves(lines, columns);
    console.log('after', columns);
    const topCrate = readTopCrate(columns);
    console.log('topCrate', topCrate);
  } catch (error) {
    console.error(error);
  }
}

function readTopCrate(columns: Map<number, string[]>): string {
  let topCrate = '';
  for (const value of columns.values()) {
    topCrate += value[value.length - 1] ?? '';
  }
  return topCrate;
}

function readMoves(lines: string[], columns: Map<number, string[]>): Map<number, string[]> {
  const regex = /move (\d) from (\d) to (\d)/gm;
  let lineIndex = 0;
  let line = lines[lineIndex];
  while (!line.startsWith('move')) {
    line = lines[++lineIndex];
  }
  for (let i = lineIndex; i < lines.length; i++) {
    line = lines[i];
    let m: RegExpExecArray | null;
    while ((m = regex.exec(line)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const [, quantity, from, to] = m;
      for (let q = 0; q < +quantity; q++) {
        const toMove = columns.get(+from)?.pop();
        const colDest = columns.get(+to);
        if (toMove !== undefined && colDest !== undefined) {
          colDest.push(toMove);
        }
      }
    }
  }
  return columns;
}

function initializeColumns(lines: string[], colNumberPositions: Map<number, number>): Map<number, string[]> {
  const columns: Map<number, string[]> = new Map();
  for (const value of colNumberPositions.values()) {
    columns.set(value, []);
  }

  let lineIndex = 0;
  let line = lines[lineIndex];
  while (!line.startsWith(' 1')) {
    for (let i = 0; i < line.length; i++) {
      const colNumber = colNumberPositions.get(i);
      const colToUpdateIfValue = colNumber !== undefined ? columns.get(colNumber) : undefined;
      if (colToUpdateIfValue !== undefined && line[i] !== ' ') {
        colToUpdateIfValue.unshift(line[i]);
      }
    }
    line = lines[++lineIndex];
  }
  return columns;
}

function readInputColumnConfig(lines: string[]): Map<number, number> {
  // reading max height
  let lineIndex = 0;
  let line = '';
  while (!line.startsWith(' 1')) {
    line = lines[lineIndex++];
    /* console.log(line); */
  }
  const maxHeight = lineIndex - 1;
  // now line starts With ' 1' is true which means we're reading cols description

  // reading nb columns position
  const colNumberPositions: Map<number, number> = new Map(); // key = colPosition, value = colNumber
  for (let i = 0; i < line.length; i++) {
    const maybeANumber = line[i];
    if (!isNaN(parseInt(maybeANumber))) {
      colNumberPositions.set(i, parseInt(maybeANumber));
    }
  }

  // output some debug infos
  const nbColumns = parseInt(line.slice(line.lastIndexOf('   ')));
  /* console.log(`maxHeight ${maxHeight} nbColumns ${nbColumns}`); */
  return colNumberPositions;
}
