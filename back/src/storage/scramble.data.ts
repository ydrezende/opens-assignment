import { Scramble } from 'src/interfaces/scramble';
import { InternalServerErrorException } from '@nestjs/common';
import { readFileSync, writeFile, writeFileSync } from 'node:fs';
import { Entry } from 'src/interfaces/entry';

export class ScrambleStorage {
  public static async addEntry(entry: Entry): Promise<boolean> {
    try {
      //Read storage content
      const scramble: Scramble = JSON.parse(
        readFileSync('scramble-data.json', 'utf8'),
      );

      scramble.entries.push(entry);

      //Write to storage
      writeFileSync('scramble-data.json', JSON.stringify(scramble), 'utf8');


      return true;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public static async getScramble(): Promise<Scramble> {
    try {
      //Read storage content
      const scramble = JSON.parse(readFileSync('scramble-data.json', 'utf8'));

      return scramble;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public static reset() {
    writeFile('scramble-data.json', '{"entries": []}', 'utf8', () => {});
  }
}
