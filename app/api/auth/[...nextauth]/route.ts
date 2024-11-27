import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Adjust the import based on your Firebase config location
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase"; // Import Firestore if needed
import { SessionStrategy } from "next-auth"; // Import SessionStrategy

interface JWT {
  id: string;
  email: string;
  role: string;
}

interface Session {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // If no credentials provided, return null
        }

        try {
          // Sign in with Firebase
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;

          // Fetch role from Firestore (or other database)
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          let role = "student"; // Default role

          if (userDoc.exists()) {
            role = userDoc.data().role || role;
          }

          // Return user object with necessary details
          return {
            id: user.uid,
            name: user.displayName || "No Name",
            email: user.email,
            role: role, // Assign role from Firestore or logic
          };
        } catch (error) {
          console.error("Authentication failed:", error);
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      // Persist user data in the JWT token for session management
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Store role in the token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Pass user data from JWT token to session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role; // Assign role to session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Store the secret securely in env
  session: {
    strategy: "jwt" as SessionStrategy, // Place this inside the session object
  },
  pages: {
    signIn: "/auth/signin", // Customize the login page URL if needed
  },
};

