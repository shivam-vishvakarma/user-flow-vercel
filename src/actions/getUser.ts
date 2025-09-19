"use server";

import { verifyJwt } from "@/lib/jwt";
import { User } from "@/models/user";
import { User as UserType } from "@/types/types";

export async function getUser({
  token,
}: {
  token: string;
}): Promise<UserType | null> {
  try {
    if (!token) {
      return null;
      
    }
    const decoded = await verifyJwt(token);
    if (!decoded) {
      return null;
    }
    const user = await User.findById(decoded.id);
    return {
      id: user?._id.toString(),
      name: user?.name,
      email: user?.email,
      bio: user?.bio,
      jobTitle: user?.jobTitle,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
