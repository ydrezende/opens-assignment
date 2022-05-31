import { Scrambler } from './Scrambler';
import { DistanceScrambler } from './DistanceScrambler';
import { ProximityScrambler } from './ProximityScrambler';
import { RandomScrambler } from './RandomScrambler';

export class ScramblerFactory {
  static create(type: string): Scrambler {
    switch (type) {
      case 'proximity':
        return new ProximityScrambler();
      case 'random':
        return new RandomScrambler();
      case 'distance':
        return new DistanceScrambler();
      default:
        return new ProximityScrambler();
    }
  }
}
