"use server";

import { connectDb } from "@/db/connectDb";
import { signJwt } from "@/lib/jwt";
import { User } from "@/models/user";
import { AuthResponse, LoginData } from "@/types/types";

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  try {
    await connectDb();
    const user = await User.findOne({
      email: data.email,
      password: data.password,
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    console.log("User logged in successfully");
    const token = await signJwt({ id: user._id, email: user.email });
    return { token };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
}
