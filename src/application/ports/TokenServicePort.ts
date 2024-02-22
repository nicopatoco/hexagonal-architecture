import { ExternalUser } from '../../domain/models/User';
import jwt from 'jsonwebtoken';

export interface TokenServicePort {
  createToken(user: ExternalUser): string;
  verifyToken(token: string): string | jwt.JwtPayload;
}
