import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../../domain/models/User';
import { getDb } from '../../database/mongoDBConnection';

export class UserRepository implements UserRepositoryPort {
  private db = getDb();
  private collection = this.db.collection<User>('users');

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.collection.findOne({ username });
    return user;
  }

  async save(user: User): Promise<User> {
    // const result = await this.collection.insertOne(user);
    await this.collection.insertOne(user);
    return user;
  }
}
