import { Entry } from 'src/interfaces/entry';
import { Scramble as ScrambeInterface } from 'src/interfaces/scramble';

export class Scramble {
  public entries: Entry[];

  construct(scramble: ScrambeInterface) {
    this.entries = scramble.entries;
  }

  public getEntries() {
    return this.entries;
  }

  public toJson() {
    return {
      entries: this.entries,
    };
  }
}
