import { AuthenticatedUser } from '../dtos/AuthenticatedUser';

export interface AuthenticationServicePort {
  register(email: string, password: string): Promise<AuthenticatedUser>;
  login(email: string, password: string): Promise<AuthenticatedUser>;
}
