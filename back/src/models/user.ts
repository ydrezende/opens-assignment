import { User as UserInterface } from 'src/interfaces/user';

export class User {
  public name: string;

  construct(user: UserInterface) {
    this.name = user.name;
  }

  public getName() {
    return this.name;
  }
}
