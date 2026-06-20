export default function StaticPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-base leading-relaxed text-gray-800">
      {children}
    </div>
  );
}
