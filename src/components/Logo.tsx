export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 13L7 17L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-red-500"
      />
      <path
        d="M13 11L17 7L21 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-green-500"
      />
      <circle
        cx="7"
        cy="17"
        r="1.5"
        fill="currentColor"
        className="text-red-500"
      />
      <circle
        cx="17"
        cy="7"
        r="1.5"
        fill="currentColor"
        className="text-green-500"
      />
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
        className="text-muted-foreground opacity-50"
      />
    </svg>
  );
}

