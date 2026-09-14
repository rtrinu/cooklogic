import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold text-zinc-950">
          CookLogic<span className="text-emerald-600">.</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-zinc-600 sm:flex">
          <Link href="#how-it-works" className="transition-colors hover:text-zinc-950">
            How it works
          </Link>
          <Link href="#why-cooklogic" className="transition-colors hover:text-zinc-950">
            Why CookLogic
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Start free
          </Link>
        </div>
      </nav>
    </header>
  );
}