/*
Brief:
This is the main file for our application
*/
import Link from "next/link";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="bg-red-300 text-xl">Hello world</h1>
        <button><Link href="/login">login</Link></button>
      </main>
    </div>
  );
}
