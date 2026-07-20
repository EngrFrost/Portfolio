import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-4 text-text-muted">This page wandered off.</p>
        <Link href="/" className="mt-8 inline-block text-accent underline underline-offset-4">
          Back home
        </Link>
      </div>
    </main>
  );
}
