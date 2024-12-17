import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User object to include "role"
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Optional "role" property
  }

  interface Session {
    user: User & {
      role?: string; // Include "role" in the session's user object
    };
  }
}
