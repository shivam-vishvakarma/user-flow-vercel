"use server";

import { connectDb } from "@/db/connectDb";
import { signJwt } from "@/lib/jwt";
import { User } from "@/models/user";
import { AuthResponse, RegisterData } from "@/types/types";

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  try {
    await connectDb();
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      jobTitle: data.jobTitle,
    });
    console.log("User registered successfully");
    const token = await signJwt({ id: user._id, email: user.email });
    return {
      token,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
