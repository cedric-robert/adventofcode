import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day4() {
  console.log('day4');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input.txt'), { encoding: 'utf-8' });
    let overlapCount = 0;
    let overlapAtAllCount = 0;
    let lines = data.split(/\r?\n/);
    lines = lines.map((l) => l.trim()).filter((l) => (l ? true : false));
    lines.forEach((line) => {
      /* console.log(line); */
      const [intervalDefinition1, intervalDefinition2] = line.split(',');
      overlapCount = isOverlap(new Interval(intervalDefinition1), new Interval(intervalDefinition2)) ? ++overlapCount : overlapCount;
      overlapAtAllCount = nbElementsInBoth(new Interval(intervalDefinition1), new Interval(intervalDefinition2)) ? ++overlapAtAllCount : overlapAtAllCount;
    });
    console.log(`overlapCount ${overlapCount} overlapAtAllCount ${overlapAtAllCount}`);
  } catch (error) {
    console.error(error);
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
  toString(): string {
    return `[${this.start}, ${this.end}]`;
  }
}

function isOverlap(interval1: Interval, interval2: Interval): boolean {
  /* console.debug(`interval1 ${interval1.toString()} interval2 ${interval2.toString()}`); */

  if (interval1.start <= interval2.start && interval1.end >= interval2.end) {
    /* console.debug('interval1 is overlapping interval2'); */
    return true;
  }
  if (interval2.start <= interval1.start && interval2.end >= interval1.end) {
    /*  console.debug('interval2 is overlapping interval1'); */
    return true;
  }
  return false;
}

function nbElementsInBoth(interval1: Interval, interval2: Interval): number {
  const elemntsIn1: number[] = [];
  const elemntsIn2: number[] = [];
  for (let i = interval1.start; i <= interval1.end; i++) {
    elemntsIn1.push(i);
  }
  for (let i = interval2.start; i <= interval2.end; i++) {
    elemntsIn2.push(i);
  }
  let nbElementsInBoth = 0;
  elemntsIn1.forEach((in1) => {
    nbElementsInBoth = elemntsIn2.includes(in1) ? ++nbElementsInBoth : nbElementsInBoth;
  });

  console.debug(`interval1 ${interval1.toString()} interval2 ${interval2.toString()} nbElementsInBoth ${nbElementsInBoth}`);
  return nbElementsInBoth;
}
