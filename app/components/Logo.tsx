import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" style={styles.link} aria-label="Email DNS Check">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="8" fill="#E0B100" />
        <path
          d="M9 12h18v12H9z"
          fill="#111827"
          opacity="0.15"
        />
        <path
          d="M9 12l9 7 9-7"
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span style={styles.text}>Email DNS Check</span>
    </Link>
  );
}

const styles: Record<string, React.CSSProperties> = {
  link: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  text: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#E0B100", // mustard
    letterSpacing: "-0.2px",
  },
};
