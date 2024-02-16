import { User } from '../../domain/models/User';

export interface UserRepositoryPort {
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
