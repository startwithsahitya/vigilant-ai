import NextAuth from "next-auth";

// This file is used to augment the types used by NextAuth

declare module "next-auth" {
  interface User {
    id: string | null;      // Custom user ID field (ensure it's either string or null)
    email: string | null | undefined;   // Email of the user (can be string or undefined)
    role: string | null | undefined;    // Role of the user (e.g., 'student', 'teacher')
  }

  interface Session {
    user: User;     // The user object within the session
  }

  interface JWT {
    id: string | null | undefined;      // Custom user ID field in JWT
    email: string;   // Email of the user in JWT
    role: string;    // Role of the user in JWT (e.g., 'student', 'teacher')
  }
}
