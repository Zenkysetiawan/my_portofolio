const styles = {
  primary:
    "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500",
  outline: "border border-blue-500/60 text-blue-500 hover:bg-blue-500/10",
};

export default function Button({
  href,
  variant = "primary",
  children,
  ...props
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
      {...props}
    >
      {children}
    </a>
  );
}
