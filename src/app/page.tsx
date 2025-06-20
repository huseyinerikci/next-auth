import { auth0 } from "../lib/auth0";
import "./globals.css";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <main className="flex justify-center items-center">
      {session?.user ? (
        <h1 className="mt-44 text-3xl p-10 bg-red-700">
          Welcome, {session?.user.name}!
        </h1>
      ) : (
        <h1 className="mt-44 text-3xl p-10 bg-red-700">
          Hesabınız varsa menüden giriş yapınız. Hesabınız yok ise Kayıt olunuz.
        </h1>
      )}
    </main>
  );
}
