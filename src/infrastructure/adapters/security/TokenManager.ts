import jwt from 'jsonwebtoken';
import { ExternalUser } from '../../../domain/models/User';
import { Request, Response, NextFunction } from 'express';

export const createJWT = (user: ExternalUser): string => {
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);
  return token;
};

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
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log('user: ', user);
    next();
  } catch (error) {
    res.status(401);
    res.send('Not authorized, token failed');
  }
};
