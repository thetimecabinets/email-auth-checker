import Link from "next/link";
import Navigation from "./Navigation";
import Logo from "./Logo";

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-sm font-semibold text-neutral-900">
            Email DNS Check
          </span>
        </Link>

        <nav aria-label="Primary">
          <Navigation />
        </nav>
      </div>
    </header>
  );
}