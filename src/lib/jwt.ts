"use server";

import { JwtPay } from "@/types/types";
import { sign, verify } from "jsonwebtoken";

export const signJwt = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}): Promise<string> => {
  const payload: JwtPay = {
    id,
    email,
    iat: Math.floor(Date.now() / 1000), // Issued at time
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
  };
  const token = sign(payload, process.env.JWT_SECRET!);
  return token;
};

export const verifyJwt = async (token: string): Promise<JwtPay | null> => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPay;
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
