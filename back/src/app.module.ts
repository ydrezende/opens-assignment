import { Module } from '@nestjs/common';
import { ScrambleController } from './controllers/scramble.controller';
import { ScrambleService } from './services/scramble.service';

@Module({
  imports: [],
  controllers: [ScrambleController],
  providers: [ScrambleService],
})
export class AppModule {}
