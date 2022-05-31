import { Scramble } from 'src/interfaces/scramble';
import { ScrambleResult } from 'src/interfaces/scramble-result';

export abstract class Scrambler {
  abstract scramble(scramble: Scramble): ScrambleResult;
}
