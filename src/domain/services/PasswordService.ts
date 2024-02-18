import { hashPassword, verifyPassword } from '../../infrastructure/adapters/security/PasswordHasher';

export class PasswordService {
  static hashPassword(password: string): Promise<string> {
    return hashPassword(password);
  }

  static verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return verifyPassword(password, hashedPassword);
  }
}
