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
          working with Tailwind CSS palettes, custom hex values, and semantic
          color tokens. It helps you compare foreground and background colors in
          real time and make accessibility part of everyday UI decisions.
        </p>
      </div>
    </section>
  );
}
