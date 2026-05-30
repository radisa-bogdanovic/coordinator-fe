export type User = {
  id: number;
  email: string;
  role: Role;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
