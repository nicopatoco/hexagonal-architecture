import jwt from 'jsonwebtoken';
import { TokenServicePort } from '../../../application/ports/TokenServicePort';
import { ExternalUser } from '../../../domain/models/User';

export class JWTTokenManager implements TokenServicePort {
  createToken(user: ExternalUser): string {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    // Replace `any` with your specific type as needed
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
}
