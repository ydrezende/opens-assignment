import { Injectable } from '@nestjs/common';
import { Entry } from 'src/interfaces/entry';
import { Scramble } from 'src/interfaces/scramble';
import { ScrambleResult } from 'src/interfaces/scramble-result';
import { Scrambler } from 'src/scramblers/Scrambler';
import { ScramblerFactory } from 'src/scramblers/ScramblerFactory';
import { ScrambleStorage } from 'src/storage/scramble.data';

@Injectable()
export class ScrambleService {
  async getScramble(): Promise<Scramble> {
    const scramble: Scramble = await ScrambleStorage.getScramble();

    return scramble;
  }

  async addEntry(entry: Entry): Promise<boolean> {
    return await ScrambleStorage.addEntry(entry);
  }

  async scramble(type?: string): Promise<ScrambleResult> {
    const scrambler: Scrambler = ScramblerFactory.create(type ? type : null);

    const result: ScrambleResult = scrambler.scramble(
      await ScrambleStorage.getScramble(),
    );

    return result;
  }

  reset() {
    ScrambleStorage.reset();
  }
}
