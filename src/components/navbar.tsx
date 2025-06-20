"use client";

import { useUser } from "@auth0/nextjs-auth0";

import React from "react";

const NavBar = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    <div className="py-5 flex w-full justify-between bg-gray-700 px-44">
      <div className="flex">
        <a href="/">Next-Auth</a>
      </div>
      <div className="flex gap-4">
        {!user && !isLoading && (
          <>
            <a href="/auth/login?screen_hint=signup">
              <button>Kayıt Ol</button>
            </a>
            <a href="/auth/login">
              <button>Giriş Yap</button>
            </a>
          </>
        )}
        {user && !isLoading && (
          <>
            <a href="/profile">
              <button>Profil</button>
            </a>
            <a href="/auth/logout">
              <button>Çıkış</button>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
