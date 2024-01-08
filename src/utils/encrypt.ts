import { hash, compare } from 'bcrypt';

export const encryptPassword = (password: string): Promise<string> =>
  hash(password, 10);

export const encryptCompare = compare;
