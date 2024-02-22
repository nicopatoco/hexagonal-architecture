import { Request, Response } from 'express';
import { AuthenticationService } from '../../../../application/services/AuthenticationService';
import { UserRepository } from '../../repositories/UserRepository';
import { PasswordService } from '../../../../domain/services/PasswordService';
import { loginSchema, registerSchema } from '../../../../application/dtos/AuthenticatedUser';
import { z } from 'zod';
import { TokenService } from '../../../../domain/services/TokenService';

// Instantiate the necessary components
const userRepository = new UserRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const authenticationService = new AuthenticationService(userRepository, passwordService, tokenService);

export const userRoutes = {
  // Registration endpoint
  async register(req: Request, res: Response) {
    try {
      // Validate the request body against the schema
      const validatedData = registerSchema.parse(req.body);
      const { email, password } = validatedData;

      const newUser = await authenticationService.register(email, password);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error });
      }
      return res.status(500).json({ success: false, message: error });
    }
  },

  // Login endpoint
  async login(req: Request, res: Response) {
    try {
      // Validate the request body against the schema
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;
      const user = await authenticationService.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation error
        return res.status(400).json({ success: false, errors: error });
      }
      // General error (consider logging the error in real applications)
      console.error(error);
      return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
  },
};

export default userRoutes;
