export class User {
  public name: string;

  construct({ name }) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }
}
