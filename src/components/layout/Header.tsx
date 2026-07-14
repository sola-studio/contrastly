import { HeaderBrand } from './HeaderBrand';

export const Header = () => {
  return (
    <header className="w-full py-3 px-6 flex flex-col gap-2 border-b items-center bg-slate-50">
      <div className="flex flex-col items-center gap-0.5">
        <HeaderBrand />
        <p className="text-sm text-slate-600 tracking-widest">
          Tailwind color contrast checker
        </p>
      </div>

      <p className="text-xs text-slate-600 max-w-2xl">
        Check WCAG contrast between Tailwind CSS colors, custom hex values, and
        semantic color tokens.
      </p>
    </header>
  );
};
