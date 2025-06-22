"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <p className="text-center mt-44">Loading...</p>;

  if (!session) return <p className="text-center mt-44">Oturum bulunamadı.</p>;

  const user = session.user;

  return (
    <div className="grid place-self-center place-items-center mt-40 gap-3 py-10 bg-red-900 w-[40%]">
      <img
        src={user?.image ?? ""}
        alt="Profile"
        className="rounded-full w-20 h-20"
      />
      <h2>Role : {user?.role}</h2>
      <h2>Name : {user?.name}</h2>
      <p>Email : {user?.email}</p>
    </div>
  );
};

export default Profile;
