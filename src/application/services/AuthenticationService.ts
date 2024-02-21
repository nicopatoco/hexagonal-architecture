import { DomainError } from '../../domain/errors/DomainError';
import { User } from '../../domain/models/User';
import { PasswordService } from '../../domain/services/PasswordService';
import { AuthenticatedUser } from '../dtos/AuthenticatedUser';
import { AuthenticationServicePort } from '../ports/AuthenticationServicePort';
import { UserRepositoryPort } from '../ports/UserRepositoryPort';

export class AuthenticationService implements AuthenticationServicePort {
  constructor(
    private userRepository: UserRepositoryPort,
    private passwordService: PasswordService
  ) {}

  async register(email: string, password: string): Promise<AuthenticatedUser> {
    if (!email || !password) {
      throw new DomainError('Username and password are required.');
    }
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new DomainError('Username already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser: User = { email, password: hashedPassword };
    const repoUser = await this.userRepository.save(newUser);

    // Generate a token and return the authenticated user
    const token = ''; /* Generate or retrieve a token */
    return { id: repoUser.id, email, token };
  }

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    if (!email || !password) {
      throw new DomainError('Email and password are required.');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new DomainError('User not found');
    }

    const isPasswordValid = await this.passwordService.verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new DomainError('Incorrect password');
    }

    // Generate a token and return the authenticated user
    const token = ''; //await this.createToken(user);
    return { email: user.email, id: user.id, token };
  }
}
