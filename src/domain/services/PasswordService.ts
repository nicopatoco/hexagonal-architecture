import { hashPassword, verifyPassword } from '../../infrastructure/adapters/security/PasswordHasher';

export class PasswordService {
  hashPassword(password: string): Promise<string> {
    return hashPassword(password);
  }

  verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return verifyPassword(password, hashedPassword);
  }
}
