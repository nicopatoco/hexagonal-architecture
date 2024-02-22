import { NextFunction, Request, Response } from 'express';
import { JWTTokenManager } from '../../security/JWTTokenManager';

const jwtTokenManager = new JWTTokenManager();

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization; // check if there is a token

  if (!bearer) {
    res.status(401);
    res.send('Not authorized, no token');
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.send('Not authorized, no token');
    return;
  }

  try {
    const user = jwtTokenManager.verifyToken(token);
    console.log('user: ', user);
    next();
  } catch (error) {
    res.status(401);
    res.send('Not authorized, token failed');
  }
};
