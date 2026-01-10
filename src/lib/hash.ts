import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error("Password is required");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare plain password with hashed password
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  if (!password || !hashedPassword) {
    return false;
  }

  return bcrypt.compare(password, hashedPassword);
}
