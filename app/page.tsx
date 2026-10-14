/*
Brief:
This is the main file for our application
*/
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <h1 className="">Hello world</h1>
        <button><Link href="/login">login</Link></button>
      </main>
    </div>
  );
}
