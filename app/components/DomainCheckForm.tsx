"use client";

import { useState } from "react";

type Props = {
  buttonLabel?: string;
  placeholder?: string;
  onSubmit?: (domain: string) => void;
};

export default function DomainCheckForm({
  buttonLabel = "Check domain",
  placeholder = "example.com",
  onSubmit,
}: Props) {
  const [domain, setDomain] = useState("");

  return (
    <div className="checker">
      <div style={{ fontWeight: 800, fontSize: 16 }}>Check a domain</div>
      <div style={{ color: "#6b7280", fontSize: 14, marginTop: 6 }}>
        Live DNS lookups. No tracking. No saved domains.
      </div>

      <form
        className="checker-form"
        onSubmit={(e) => {
          e.preventDefault();
          const d = domain.trim();
          if (!d) return;
          onSubmit?.(d);
        }}
      >
        <input
          className="checker-input"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={placeholder}
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Domain name"
        />
        <button className="checker-button" type="submit">
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}