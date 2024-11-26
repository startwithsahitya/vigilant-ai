import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash password before saving to DB
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare given password with stored hash
export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate a JWT token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};
