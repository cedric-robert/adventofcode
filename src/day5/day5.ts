import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day5() {
  console.log('day5');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input.txt'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    const colNumberPositions = readInputColumnConfig(lines);
    let columns = initializeColumns(lines, colNumberPositions);
    const crateModel = 9001;
    /* console.log('before', columns); */
    columns = readMoves(lines, columns, crateModel);
    /* console.log('after', columns); */
    const topCrate = readTopCrate(columns);
    console.log(`topCrate with crateModel(${crateModel}):`, topCrate);
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

function readMoves(lines: string[], columns: Map<number, string[]>, crateMoverModel = 9000): Map<number, string[]> {
  const regex = /move (\d+) from (\d+) to (\d+)/gm;
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
      switch (crateMoverModel) {
        case 9000:
          moveCrateModel9000(columns, +quantity, +from, +to);
          break;
        case 9001:
          moveCrateModel9001(columns, +quantity, +from, +to);
          break;
      }
    }
  }
  return columns;
}

function moveCrateModel9000(columns: Map<number, string[]>, quantity: number, from: number, to: number): void {
  for (let q = 0; q < quantity; q++) {
    const toMove = columns.get(from)?.pop();
    const colDest = columns.get(to);
    if (toMove !== undefined && colDest !== undefined) {
      colDest.push(toMove);
    }
  }
}

function moveCrateModel9001(columns: Map<number, string[]>, quantity: number, from: number, to: number): void {
  const fromCol = columns.get(from);
  const colDest = columns.get(to);
  /* console.log(`asking to move ${quantity}/${fromCol?.length} from ${from} to ${to}`); */
  if (fromCol && colDest) {
    const toMove = fromCol.splice(quantity * -1);
    colDest.push(...toMove);
  }

  /* console.log('after moving', columns.values()); */
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
