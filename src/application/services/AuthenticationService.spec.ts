import { ExternalUser, RepoUser } from '../../domain/models/User';
import { PasswordService } from '../../domain/services/PasswordService';
import { UserRepository } from '../../infrastructure/adapters/repositories/UserRepository';
import { JWTTokenManager } from '../../infrastructure/adapters/security/JWTTokenManager';
import { AuthenticationService } from './AuthenticationService';

// Mock the UserRepository
jest.mock('../../infrastructure/adapters/repositories/UserRepository');
jest.mock('../../domain/services/PasswordService');

// Helper function to create a new instance of AuthenticationService with mocked dependencies
const createService = () => {
  // Create a mocked instance of UserRepository
  const mockedUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
  const passwordService = new PasswordService() as jest.Mocked<PasswordService>;
  const tokenSerive = new JWTTokenManager();

  const authenticationService = new AuthenticationService(mockedUserRepository, passwordService, tokenSerive);
  return { authenticationService, userRepository: mockedUserRepository, passwordService };
};

describe('AuthenticationService', () => {
  describe('register', () => {
    it('should register a user with valid credentials', async () => {
      const { authenticationService, userRepository, passwordService } = createService();
      // Given
      const email = 'testUser';
      const password = 'password';
      const mockUser: ExternalUser = { id: 'ID-123456', email };
      userRepository.save.mockResolvedValue(mockUser);
      passwordService.hashPassword.mockResolvedValue(`hashed-${password}`);
      // When
      const newUser = await authenticationService.register(email, password);
      // Then
      expect(userRepository.save).toHaveBeenCalledWith({
        email,
        password: `hashed-${password}`,
      });
      expect(newUser).not.toBeNull();
    });

    it('should throw an error if the username already exists', async () => {
      // Given
      const { authenticationService, userRepository } = createService();
      const user: RepoUser = { id: 'ID-123456', email: 'testUser', password: 'hashed-password' };
      // When and Then
      userRepository.findByEmail.mockResolvedValue(user);
      await expect(authenticationService.register(user.email, user.password)).rejects.toThrow(
        'Username already exists'
      );
    });
  });

  describe('login', () => {
    it('should allow a user to login with correct credentials', async () => {
      const { authenticationService, userRepository, passwordService } = createService();
      // Given
      const user: RepoUser = {
        id: 'ID-123456',
        email: 'testUser',
        password: 'hashed-password',
      };
      userRepository.findByEmail.mockResolvedValue(user);
      passwordService.verifyPassword.mockResolvedValue(true);
      // When
      const success = authenticationService.login(user.email, user.password);
      // Then
      await expect(success).resolves.toBeTruthy();
    });

    it('should reject login with incorrect password', async () => {
      const { authenticationService, userRepository, passwordService } = createService();
      // Given
      userRepository.findByEmail.mockResolvedValue({
        id: 'ID-123456',
        email: 'testUser',
        password: 'hashed-password',
      });
      passwordService.verifyPassword.mockResolvedValue(false);
      // When
      await expect(authenticationService.login('testUser', 'wrongPassword')).rejects.toThrow('Incorrect password');
    });
  });
});
