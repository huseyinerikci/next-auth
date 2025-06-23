import type { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const namespace = "https://next-auth.example.com/roles";
export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      authorization: {
        params: { prompt: "login" },
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = user?.id;

        const rawRole = (profile as any)[namespace];
        const role =
          !rawRole || (Array.isArray(rawRole) && rawRole.length === 0)
            ? "user"
            : rawRole;
        token.role = role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as "admin" | "user";
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
