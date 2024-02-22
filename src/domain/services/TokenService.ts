import { createJWT } from '../../infrastructure/adapters/security/TokenManager';
import { ExternalUser } from '../models/User';

export class TokenService {
  createJWT(user: ExternalUser): string {
    return createJWT(user);
  }
}
