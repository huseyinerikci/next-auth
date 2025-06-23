"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const handleLogin = () => {
    signIn("auth0", {
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="py-5 flex w-full justify-between bg-gray-700 px-44 text-white">
      <div className="flex">
        <Link href="/">Next-Auth</Link>
      </div>

      {isLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <button>Profil</button>
              </Link>

              {Array.isArray(user?.role) && user.role.includes("admin") && (
                <Link href="/admin">
                  <button>Admin Paneli</button>
                </Link>
              )}

              <button onClick={handleLogout}>Çıkış</button>
            </>
          ) : (
            <button onClick={handleLogin}>Giriş Yap</button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
