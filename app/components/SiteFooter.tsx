import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-600">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Email DNS Check</p>

          <div className="flex items-center gap-4">
            <Link className="hover:text-neutral-900" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-neutral-900" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-neutral-900" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Live DNS only. No saved domains. No tracking.
        </p>
      </div>
    </footer>
  );
}