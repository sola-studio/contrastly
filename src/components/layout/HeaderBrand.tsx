import Link from 'next/link';

export function HeaderBrand() {
  return (
    <Link
      href="/"
      className="text-xl font-normal text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:rounded-xs tracking-widest uppercase hover:text-blue-700"
    >
      Contrastly
    </Link>
  );
}
