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

export async function day32() {
  console.log('day32');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input2.txt'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    const currentLineIndex = 1;
    let priorityTotal = 0;

    for (let i = 0; i < lines.length; i = i + 3) {
      const common = findCommon([lines[i], lines[i + 1], lines[i + 2]]);
      console.log(common);
      const priority = priorities.indexOf(common);
      priorityTotal += priority;
    }

    console.log(`priorityTotal ${priorityTotal}`);
  } catch (error) {
    console.log(error);
  }
}

function findCommon(groupLines: string[]): string {
  const line1 = Array.from(groupLines[0]);
  const line2 = Array.from(groupLines[1]);
  const line3 = Array.from(groupLines[2]);

  return line1.filter((charFirst) => {
    return line2.find((charsecond) => charsecond === charFirst) && line3.find((charThree) => charThree === charFirst);
  })[0];
}
