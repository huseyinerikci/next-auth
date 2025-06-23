"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-44">Yükleniyor...</p>;
  }

  return (
    <div className="grid place-self-center place-items-center mt-40 gap-3 py-10 bg-red-900 w-[40%]">
      <h1 className="text-3xl font-bold ">Admin Panel</h1>
      <p className="mt-4">Yalnızca admin kullanıcılar burayı görebilir.</p>
    </div>
  );
}
