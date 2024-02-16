import { User } from '../../domain/models/User';

export interface AuthenticationServicePort {
  register(username: string, password: string): Promise<User>;
  login(username: string, password: string): Promise<boolean>;
}
