export class PasswordService {
  static hashPassword(password: string): string {
    // Mock hashing function
    return `hashed-${password}`;
  }

  static verifyPassword(hashedPassword: string, password: string): boolean {
    // Mock verification
    return hashedPassword === `hashed-${password}`;
  }
}
