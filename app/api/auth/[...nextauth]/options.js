import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const { email, password, role } = credentials;

                // Example validation logic based on role
                if (role === "student") {
                    if (email === "student@example.com" && password === "student123") {
                        return { id: 1, name: "Student User", email, role };
                    }
                } else if (role === "teacher") {
                    if (email === "teacher@example.com" && password === "teacher123") {
                        return { id: 2, name: "Teacher User", email, role };
                    }
                }

                // Return null if login fails
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
};
