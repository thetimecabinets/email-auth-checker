import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type Props = { children: ReactNode };

export default function PageShell({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}