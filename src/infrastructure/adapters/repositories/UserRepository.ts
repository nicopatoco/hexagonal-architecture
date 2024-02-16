import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../../domain/models/User';

export class UserRepository implements UserRepositoryPort {
  // A mock implementation of the UserRepositoryPort for testing without a database.
  private users: User[] = [];

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
