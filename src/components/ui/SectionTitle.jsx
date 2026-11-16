export default function SectionTitle({ children }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold sm:text-4xl">{children}</h2>
      <div className="mt-3 h-1 w-16 rounded bg-linear-to-r from-blue-500 to-purple-500" />
    </div>
  );
}
