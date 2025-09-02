import Link from "next/link";

export default function Home() {
  return (
      <Link href="/pages/login" className="text-blue-500 hover:underline text-2xl">
        Login Page
      </Link>
  );
}
