import Navigation from "./Navigation";
import Logo from "./Logo";

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Logo />

        <nav aria-label="Primary">
          <Navigation />
        </nav>
      </div>
    </header>
  );
}