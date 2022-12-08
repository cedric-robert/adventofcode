import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day1() {
  console.log('day1');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    const maxCalories: number[] = [];
    let maxCurrentGroup = 0;

    lines.forEach((line) => {
      /*   console.log(`line: ${line}`); */
      const value = Number.parseInt(line);
      if (Number.isNaN(value)) {
        // new group begin
        maxCalories.push(maxCurrentGroup);
        maxCurrentGroup = 0;
      } else {
        maxCurrentGroup += value;
      }
    });

    maxCalories.sort((a, b) => a - b).reverse();
    console.log(maxCalories[0] + maxCalories[1] + maxCalories[2]);
  } catch (error) {
    console.log(error);
  }
}
