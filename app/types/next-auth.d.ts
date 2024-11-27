// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name?: string;
      role: "teacher" | "student" | string; // Ensure role is included
    };
  }
}
