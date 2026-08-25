import { ExternalLink } from '@/lib/lucide';
import Link from 'next/link';

export default function About() {
  return (
    <section
      className="px-4 py-8 text-sm text-slate-600 leading-relaxed bg-slate-50 border-t"
      aria-labelledby="about-heading"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-base font-semibold text-slate-700 mb-3 text-center inline-flex items-center gap-2 justify-center"
          id="about-heading"
        >
          About
          <span className="tracking-widest uppercase font-normal">
            Contrastly
          </span>
        </h2>
        <p>
          <span className="tracking-widest uppercase font-normal">
            Contrastly
          </span>{' '}
          is a lightweight open-source tool for checking color contrast while
          working with Tailwind CSS. Select colors directly from the palette,
          compare foreground and background combinations in real time, or enter
          custom hex values when needed. It helps make accessibility checks part
          of everyday UI implementation, without interrupting your workflow to
          look up and transfer color values between tools.
        </p>
        <div className="mt-12 sm:mt-10 xl:mt-3">
          <Link
            href="https://github.com/sola-studio/contrastly#how-contrast-is-calculated"
            className="inline-flex items-center gap-1.5 text-sm text-blue-700 underline underline-offset-2 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            How the contrast is calculated
            <ExternalLink size={12} aria-hidden="true" focusable="false" />
          </Link>
        </div>
      </div>
    </section>
  );
}
