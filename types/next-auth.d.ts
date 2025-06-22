import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "admin" | "user";
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    role?: "admin" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    role?: "admin" | "user";
  }
}
