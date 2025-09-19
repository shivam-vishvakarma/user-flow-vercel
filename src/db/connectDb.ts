import mongoose from "mongoose";

export async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: "user-flow",
  });
  console.log("Connected to MongoDB");
}
