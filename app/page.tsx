import { getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "@/lib/auth0";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex justify-center items-center">
        <h1 className="mt-44 text-3xl p-10 bg-red-700">
          Hesabınız varsa menüden giriş yapınız. Hesabınız yok ise girişten önce
          kayıt olunuz.
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="mt-44 text-3xl p-10 bg-red-700">
        Hoş geldin, {session.user?.name}!
      </h1>
    </main>
  );
}
