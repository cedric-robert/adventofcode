import { promises as fsPromises } from 'fs';
import path from 'path';

export async function day22() {
  console.log('day22');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input-2-1'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    let total = 0;
    let currentLineIndex = 1;

    lines.forEach((line) => {
      if (line) {
        /* console.log(`line: ${line}`); */
        const [opp, me] = line.split(' ');
        const roundEnding = valuesFromLetter.get(me);
        if (!roundEnding) {
          throw new Error(`error with ${opp} vs ${me}`);
        }

        const roundResult = computeScore(opp, roundEnding);
        total += roundResult;
        console.log(`roundResult ${currentLineIndex++}/${lines.length}: ${roundResult}   total: ${total}`);
      }
    });
    console.log(`total: ${total}`);
  } catch (error) {
    console.log(error);
  }
}
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
// A > C > B > A

const valuesFromLetter: Map<string, 'Loose' | 'Draw' | 'Win'> = new Map([
  ['X', 'Loose'], // Loose
  ['Y', 'Draw'], // Draw
  ['Z', 'Win'] // Win
]);

const scoreFromLetter: Map<string, number> = new Map([
  ['A', 1], // Rock
  ['B', 2], // Paper
  ['C', 3] // Scissors
]);

function computeScore(opp: string, me: 'Loose' | 'Draw' | 'Win'): number {
  let meValueForEnding = '';
  let score = 0;
  switch (me) {
    case 'Loose':
      score = 0;
      if (opp === 'A') {
        meValueForEnding = 'C';
      } else if (opp === 'B') {
        meValueForEnding = 'A';
      } else if (opp === 'C') {
        meValueForEnding = 'B';
      }
      break;
    case 'Draw':
      meValueForEnding = opp;
      score = 3;
      break;
    case 'Win':
      score = 6;
      if (opp === 'A') {
        meValueForEnding = 'B';
      } else if (opp === 'B') {
        meValueForEnding = 'C';
      } else if (opp === 'C') {
        meValueForEnding = 'A';
      }
      break;

    default:
      throw new Error(`error with ${opp} vs ${me}`);
  }

  if (!scoreFromLetter.has(meValueForEnding)) {
    throw new Error(`error with ${opp} vs ${me}`);
  } else {
    score += scoreFromLetter.get(meValueForEnding)!;
  }

  return score;
}
