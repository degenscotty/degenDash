export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="currentColor"
        className="text-primary font-black"
        style={{ fontSize: "20px", fontWeight: 900 }}
      >
        D
      </text>
    </svg>
  );
}
