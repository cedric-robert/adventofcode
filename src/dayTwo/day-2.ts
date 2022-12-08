import { promises as fsPromises } from 'fs';
import path from 'path';

export async function dayTwo() {
  console.log('dayTwo');
  try {
    const data = await fsPromises.readFile(path.join(__dirname, './input-2-1'), { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);
    let total = 0;
    let currentLineIndex = 1;

    lines.forEach((line) => {
      /* console.log(`line: ${line}`); */
      const [opp, me] = line.split(' ');
      const roundResult = computeScore(opp, me);
      total += roundResult;
      console.log(`roundResult ${currentLineIndex++}/${lines.length}: ${roundResult}   total: ${total}`);
    });
    console.log(`total: ${total}`);
  } catch (error) {
    console.log(error);
  }
}
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
// A > C > B > A

const valuesFromLetter: Map<string, string> = new Map([
  ['X', 'A'], // Rock
  ['Y', 'B'], // Paper
  ['Z', 'C'] // Scissors
]);

const scoreFromLetter: Map<string, number> = new Map([
  ['A', 1], // Rock
  ['B', 2], // Paper
  ['C', 3] // Scissors
]);

function computeScore(opp: string, me: string): number {
  if (!valuesFromLetter.has(me)) {
    throw new Error(`error with ${opp} vs ${me}`);
  } else {
    me = valuesFromLetter.get(me)!;
  }

  let score = -1;
  if (!scoreFromLetter.has(me)) {
    throw new Error(`error with ${opp} vs ${me}`);
  } else {
    score = scoreFromLetter.get(me)!;
  }

  if (opp === me) {
    score += 3;
  } else if ((opp === 'A' && me === 'C') || (opp === 'C' && me === 'B') || (opp === 'B' && me === 'A')) {
    score += 0;
  } else if ((opp === 'C' && me === 'A') || (opp === 'B' && me === 'C') || (opp === 'A' && me === 'B')) {
    score += 6;
  } else {
    throw new Error(`error with ${opp} vs ${me}`);
  }

  if (score === -1) {
    throw new Error(`error with ${opp} vs ${me}`);
  }

  return score;
}
