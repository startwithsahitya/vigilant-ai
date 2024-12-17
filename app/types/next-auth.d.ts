// /types/next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role */
      role: "student" | "teacher" | "guest";
    } & DefaultSession["user"]; // Extend the default session type to include `role`
  }

  interface User {
    /** The user's role */
    role: "student" | "teacher" | "guest";
  }
}
