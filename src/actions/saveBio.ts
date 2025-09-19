"use server";

import { verifyJwt } from "@/lib/jwt";
import { User } from "@/models/user";

export async function saveBio({ token, bio }: { token: string; bio: string }) {
  const decoded = await verifyJwt(token);
  if (!decoded) throw new Error("Invalid token");
  const { id } = decoded;
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.bio = bio;
  await user.save();
  return;
}
