import { User } from '../../domain/models/User';
import { PasswordService } from '../../domain/services/PasswordService';
import { UserRepository } from '../../infrastructure/adapters/repositories/UserRepository';
import { AuthenticationService } from './AuthenticationService';

// Mock the UserRepository
jest.mock('../../infrastructure/adapters/repositories/UserRepository');

// Helper function to create a new instance of AuthenticationService with mocked dependencies
const createService = () => {
  // Create a mocked instance of UserRepository
  const mockedUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
  const passwordService = new PasswordService();

  const authenticationService = new AuthenticationService(mockedUserRepository, passwordService);
  return { authenticationService, userRepository: mockedUserRepository, passwordService };
};

describe('AuthenticationService', () => {
  describe('register', () => {
    it('should register a user with valid credentials', async () => {
      const { authenticationService, userRepository, passwordService } = createService();
      // Given
      const user = new User('1', 'testUser', 'hashed-password');
      userRepository.save.mockResolvedValue(user);
      // When
      const newUser = await authenticationService.register(user.username, user.password);
      // Then
      expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
      expect(newUser.username).toEqual(user.username);
      expect(await passwordService.verifyPassword(newUser.password, user.password)).toBeTruthy();
    });

    it('should throw an error if the username already exists', async () => {
      // Given
      const { authenticationService, userRepository } = createService();
      const user = new User('1', 'testUser', 'hashedPassword');
      // When and Then
      userRepository.findByUsername.mockResolvedValue(user);
      await expect(authenticationService.register(user.username, user.password)).rejects.toThrow(
        'Username already exists'
      );
    });
  });

  describe('login', () => {
    it('should allow a user to login with correct credentials', async () => {
      const { authenticationService, userRepository, passwordService } = createService();
      // Given
      const user = new User('1', 'testUser', await passwordService.hashPassword('password'));
      userRepository.findByUsername.mockResolvedValue(user);
      // When
      const success = authenticationService.login('testUser', 'password');
      // Then
      await expect(success).resolves.toBeTruthy();
    });

    it('should reject login with incorrect password', async () => {
      const { authenticationService, userRepository, passwordService } = createService();
      // Given
      userRepository.findByUsername.mockResolvedValue(
        new User('1', 'testUser', await passwordService.hashPassword('password'))
      );
      // When
      const success = authenticationService.login('testUser', 'wrongPassword');
      // Then
      await expect(success).resolves.toBeFalsy();
    });
  });
});
