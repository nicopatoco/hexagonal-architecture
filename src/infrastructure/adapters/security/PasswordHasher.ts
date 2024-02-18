import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
