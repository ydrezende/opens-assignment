import { Scramble } from 'src/models/scramble';
import { open } from 'node:fs/promises';
import { Scramble as ScrambeInterface } from 'src/interfaces/scramble';
import { InternalServerErrorException } from '@nestjs/common';

export class ScrambleStorage {
  public static async save(scramble: Scramble): Promise<boolean> {
    //Load user data
    const file = await open('scrambles.json', 'w+');
    try {
      //Read storage content
      const scrambles: ScrambeInterface[] = JSON.parse(
        await file.readFile('utf8'),
      );

      //Add user to the storage
      scrambles.push({
        entries: scramble.entries,
      });

      //Write to storage
      await file.writeFile(JSON.stringify(scrambles), 'utf8');
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      await file.close();
    }

    return true;
  }

  public static async getScrambles(): Promise<ScrambeInterface[]> {
    //Load user data
    const file = await open('scrambles.json', 'w+');
    let scrambles: ScrambeInterface[];
    try {
      //Read storage content
      scrambles = JSON.parse(await file.readFile('utf8'));
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      await file.close();
    }

    return scrambles;
  }
}
