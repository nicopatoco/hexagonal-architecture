import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { ExternalUser, RepoUser, User } from '../../../domain/models/User';
import { getDb } from '../../database/mongoDBConnection';

export class UserRepository implements UserRepositoryPort {
  private db = getDb();
  private collection = this.db.collection<User>('users');

  async findByEmail(email: string): Promise<RepoUser | null> {
    const user = await this.collection.findOne({ email });
    if (user) {
      return { id: user._id.toString(), password: user.password, email: user.email };
    }
    return null;
  }

  async save(user: User): Promise<ExternalUser> {
    const res = await this.collection.insertOne(user);
    return { id: res.insertedId.toString(), email: user.email };
  }
}
