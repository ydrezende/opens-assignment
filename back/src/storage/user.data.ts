import { User } from 'src/models/user';
import { open } from 'node:fs/promises';
import { User as UserInterface } from 'src/interfaces/user';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UserStorage {
  public static async save(user: User): Promise<boolean> {
    //Load user data
    const file = await open('users.json', 'w+');
    try {
      //Read storage content
      const users: UserInterface[] = JSON.parse(await file.readFile('utf8'));

      //check if same name exists
      if (users.find((element) => user.name == element.name))
        throw new BadRequestException('Name already exists');

      //Add user to the storage
      users.push({
        name: user.name,
      });

      //Write to storage
      await file.writeFile(JSON.stringify(users), 'utf8');
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      await file.close();
    }

    return true;
  }
}
