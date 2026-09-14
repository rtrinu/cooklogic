import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
          CookLogic<span className="text-emerald-600">.</span>
        </p>
        <div className="flex items-center gap-6 text-sm text-zinc-600">
          <Link href="/privacy" className="transition-colors hover:text-zinc-950">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-950">
            Terms
          </Link>
          <p className="text-zinc-400">
            © {new Date().getFullYear()} CookLogic
          </p>
        </div>
      </div>
    </footer>
  );
}