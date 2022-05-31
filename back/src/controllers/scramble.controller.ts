import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Entry } from 'src/interfaces/entry';
import { Scramble } from 'src/interfaces/scramble';
import { ScrambleService } from '../services/scramble.service';

@Controller()
export class ScrambleController {
  constructor(private readonly scrambleService: ScrambleService) {}

  @Get('/scramble')
  async getScramble(): Promise<Scramble> {
    return await this.scrambleService.getScramble();
  }

  @Post('/add_entry')
  async addEntry(@Res() res: Response, @Body() entry: Entry) {
    try {
      await this.scrambleService.addEntry(entry);
      res.send();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post('/scramble')
  async scramble(@Body() { type }) {
    try {
      const result = await this.scrambleService.scramble(type);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post('/reset')
  reset() {
    this.scrambleService.reset();
  }
}
