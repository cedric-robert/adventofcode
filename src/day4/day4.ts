import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day4() {
  console.log('day4');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './sample.txt'), { encoding: 'utf-8' });
    let lines = data.split(/\r?\n/);

    lines = lines.map((l) => l.trim()).filter((l) => (l ? true : false));

    lines.forEach((line) => {
      /* console.log(line); */

      const [intervalDefinition1, intervalDefinition2] = line.split(',');
      isOverlap(new Interval(intervalDefinition1), new Interval(intervalDefinition2));
    });
  } catch (error) {
    console.log(error);
  }
}

class Interval {
  start: number;
  end: number;
  constructor(intervalDefinition: string) {
    const [start, end] = intervalDefinition.split('-');
    this.start = parseInt(start);
    this.end = parseInt(end);
  }
}

function isOverlap(interval1: Interval, interval2: Interval): boolean {
  console.log(`interval1 [${interval1.start}, ${interval1.end}] interval2 [${interval2.start}, ${interval2.end}]`);
  return false;
}
