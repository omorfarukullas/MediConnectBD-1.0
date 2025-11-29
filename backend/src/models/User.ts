import bcrypt from 'bcryptjs';

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN' | 'SUPER_ADMIN';
  hospitalId?: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export type { User };
export { hashPassword };