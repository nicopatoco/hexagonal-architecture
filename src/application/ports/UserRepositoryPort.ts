import { ExternalUser, RepoUser, User } from '../../domain/models/User';

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<RepoUser | null>;
  save(user: User): Promise<ExternalUser>;
}
