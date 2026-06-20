import Link from 'next/link';

export function HeaderBrand() {
  return (
    <Link
      href="/"
      className="text-xl font-normal text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring tracking-widest uppercase"
    >
      Contrastly
    </Link>
  );
}
