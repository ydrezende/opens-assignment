import { UnprocessableEntityException } from '@nestjs/common';
import { Scramble } from 'src/interfaces/scramble';
import { ScrambleResult } from 'src/interfaces/scramble-result';
import { Scrambler } from './Scrambler';

export class RandomScrambler extends Scrambler {
  public scramble(scramble: Scramble): ScrambleResult {
    if (scramble.entries.length % 2 != 0)
      throw new UnprocessableEntityException('Número ímpar de inscrições');
    const result: ScrambleResult = {
      pairs: [],
    };

    do {
      Math.floor(Math.random() * scramble.entries.length);

      result.pairs.push([
        scramble.entries.splice(
          Math.floor(Math.random() * scramble.entries.length),
          1,
        )[0],
        scramble.entries.splice(
          Math.floor(Math.random() * scramble.entries.length),
          1,
        )[0],
      ]);
    } while (scramble.entries.length > 0);

    return result;
  }
}
