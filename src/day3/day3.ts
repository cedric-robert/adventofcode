import { promises as fsPromises } from 'fs';
import path from 'path';

const priorities: string[] = [''];
let aIndex = 'a'.charCodeAt(0);
for (let i = 1; i <= 26; i++) {
  priorities.push(String.fromCharCode(aIndex++));
}
aIndex = 'A'.charCodeAt(0);
for (let i = 1; i <= 26; i++) {
  priorities.push(String.fromCharCode(aIndex++));
}
console.log(priorities);

export async function day3() {
  console.log('day3');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input.txt'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    const currentLineIndex = 1;
    let priorityTotal = 0;

    lines.forEach((line) => {
      if (line) {
        line = line.trim();
        /* console.log(`line ${currentLineIndex++}/${lines.length}: ${line}`); */
        const first = Array.from(line.slice(0, line.length / 2));
        const second = Array.from(line.slice(line.length / 2));
        const common: string = first.filter((charFirst) => second.find((charSecond) => charSecond === charFirst))[0];
        const priority = priorities.indexOf(common);
        priorityTotal += priority;
        console.log(`first ${first}  second ${second}  common ${common}\tprio ${priority}`);
      }
    });
    console.log(`priorityTotal ${priorityTotal}`);
  } catch (error) {
    console.log(error);
  }
}
