import { User } from 'src/models/user';
import { open } from 'node:fs/promises';

interface UserData {
  name: string;
}

export class UserStorage {
  public static async save(user: User) {
    //Load user data
    const file = await open('users.json', 'r+');
    try {
      //Read storage content
      const users: UserData[] = JSON.parse(await file.readFile('utf8'));

      //Add user to the storage
      users.push({
        name: user.name,
      });

      //Write to storage
      await file.writeFile(JSON.stringify(users), 'utf8');
    } catch (err) {
      console.error(err);
    }
  }
}
