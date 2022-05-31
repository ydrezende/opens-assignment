import { Scramble } from 'src/interfaces/scramble';
import { Scrambler } from './Scrambler';
import { ScrambleResult } from 'src/interfaces/scramble-result';
import { UnprocessableEntityException } from '@nestjs/common';
import { Pair } from 'src/interfaces/pair';

export class ProximityScrambler extends Scrambler {
  public scramble(scramble: Scramble): ScrambleResult {
    if (scramble.entries.length % 2 != 0)
      throw new UnprocessableEntityException('Número ímpar de inscrições');
    const result: ScrambleResult = {
      pairs: [],
    };

    scramble.entries.forEach((entry, i, arr) => {
      const candidate = [Infinity, -1];

      for (let j = i + 1; j < arr.length; j++) {
        const a = entry.location.x * arr[j].location.x;
        const b = entry.location.y * arr[j].location.y;

        const distance = Math.sqrt(a * a + b * b);

        if (distance < candidate[0]) {
          candidate[0] = distance;
          candidate[1] = j;
        }
      }

      const pair: Pair = [
        arr.splice(i, 1)[0],
        arr.splice(candidate[1] - 1, 1)[0],
      ];

      result.pairs.push(pair);
    });
    return result;
  }
}
