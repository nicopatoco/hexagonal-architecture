import { Router } from 'express';
import { AuthenticationService } from '../../../../application/services/AuthenticationService';
import { UserRepository } from '../../repositories/UserRepository';
import { DomainError } from '../../../../domain/errors/DomainError';

// Instantiate the necessary components
const userRepository = new UserRepository(); // This will later be replaced with a real database implementation
const authenticationService = new AuthenticationService(userRepository);

// Create a router for user-related endpoints
const userRoutes = Router();

// Registration endpoint
userRoutes.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new DomainError('Bad request');
    }
    await authenticationService.register(username, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login endpoint
userRoutes.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new DomainError('Bad request');
    }
    const success = await authenticationService.login(username, password);
    if (success) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default userRoutes;
