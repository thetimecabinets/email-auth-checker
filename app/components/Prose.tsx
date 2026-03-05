import * as React from "react";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={[
        // Base
        "text-slate-900",
        // Headings
        "[&h1]:text-4xl [&h1]:font-semibold [&h1]:tracking-tight [&h1]:mt-0 [&h1]:mb-4",
        "[&h2]:text-2xl [&h2]:font-semibold [&h2]:tracking-tight [&h2]:mt-10 [&h2]:mb-3",
        "[&h3]:text-xl [&h3]:font-semibold [&h3]:mt-8 [&h3]:mb-2",
        // Paragraphs
        "[&p]:text-base [&p]:leading-7 [&p]:text-slate-700 [&p]:my-4",
        // Links
        "[&a]:text-indigo-700 [&a]:underline [&a]:underline-offset-4 hover:[&a]:text-indigo-800",
        // Lists
        "[&ul]:my-4 [&ul]:pl-6 [&ul]:list-disc",
        "[&ol]:my-4 [&ol]:pl-6 [&ol]:list-decimal",
        "[&li]:my-1 [&li]:text-slate-700",
        // Inline code
        "[&code]:rounded [&code]:bg-slate-100 [&code]:px-1.5 [&code]:py-0.5 [&code]:text-[0.95em] [&code]:text-slate-900",
        // Pre/code blocks
        "[&pre]:my-6 [&pre]:overflow-x-auto [&pre]:rounded-xl [&pre]:border [&pre]:border-slate-200 [&pre]:bg-slate-950 [&pre]:p-4",
        "[&pre_code]:bg-transparent [&pre_code]:p-0 [&pre_code]:text-slate-100",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}