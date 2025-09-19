import { JwtPayload } from "jsonwebtoken";

export interface User {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  bio: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface JwtPay extends JwtPayload {
  id: string;
  email: string;
}
