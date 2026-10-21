import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getStoredAdminCredentials } from "@/lib/admin-credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        // Cast request as any to bypass NextAuth beta type mismatch
        const req = request as any;
        const cookieHeader = req?.headers?.get("cookie") ?? "";

        const { username, password } = getStoredAdminCredentials(cookieHeader);

        if (
          credentials?.username === username &&
          credentials?.password === password
        ) {
          return { id: "1", name: "Admin" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
});
