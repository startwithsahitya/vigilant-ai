// pages/api/auth/[...nextauth].ts or app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/utils/db";
import Student from "@/models/studentmodel";
import Teacher from "@/models/teachermodel";
import { IStudent } from "@/models/usertypesmodel";
import { ITeacher } from "@/models/usertypesmodel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Ensure role is passed in credentials
      },
      async authorize(credentials) {
        await connectDb();

        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: string;
        };

        let user: IStudent | ITeacher | null = null;

        if (role === "student") {
          user = await Student.findOne({ email });
        } else if (role === "teacher") {
          user = await Teacher.findOne({ email });
        }

        if (user && user.password === password) {
          return {
            id: user._id.toString(), // Convert _id to string
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      // Typing session and token explicitly
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
      };
      return session;
    },
    async jwt({ token, user }: { token: any; user?: User }) {
      // Typing token and user explicitly
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/Login", // Customize this path if needed
  },
};

export default NextAuth(authOptions);
