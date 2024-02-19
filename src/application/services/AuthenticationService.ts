import { AuthenticationServicePort } from '../ports/AuthenticationServicePort';
import { UserRepositoryPort } from '../ports/UserRepositoryPort';
import { PasswordService } from '../../domain/services/PasswordService';
import { User } from '../../domain/models/User';
import { DomainError } from '../../domain/errors/DomainError';

export class AuthenticationService implements AuthenticationServicePort {
  constructor(
    private userRepository: UserRepositoryPort,
    private passwordService: PasswordService
  ) {}

  async register(username: string, password: string): Promise<User> {
    if (!username || !password) {
      throw new DomainError('Username and password are required.');
    }
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new DomainError('Username already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = new User(Date.now().toString(), username, hashedPassword);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      throw new DomainError('Username and password are required.');
    }
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new DomainError('User not found');
    }
    return this.passwordService.verifyPassword(user.password, password);
  }
}
