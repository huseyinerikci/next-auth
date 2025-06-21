"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

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
        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <button onClick={handleLogin}>Giriş Yap</button>
            </>
          ) : (
            <>
              <Link href="/profile">
                <button>Profil</button>
              </Link>
              <button onClick={handleLogout}>Çıkış</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
