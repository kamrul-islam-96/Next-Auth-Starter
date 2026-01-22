import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { id: "1", username: "hablu", password: "1234" },
  { id: "2", username: "dablu", password: "4568" },
];

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const user = userList.find((u) => u.username === username);
        if (!user) return null;

        if (user.password === password) {
          return {
            id: user.id,
            name: user.username,
          };
        }

        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
