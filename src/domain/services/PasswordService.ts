import { PasswordHashingPort } from '../../application/ports/PasswordHashingPort';
import { hashPassword, verifyPassword } from '../../infrastructure/adapters/security/PasswordHasher';

export class PasswordService implements PasswordHashingPort {
  hashPassword(password: string): Promise<string> {
    return hashPassword(password);
  }

  verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return verifyPassword(password, hashedPassword);
  }
}
