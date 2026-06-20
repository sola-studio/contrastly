import { thisYear } from '@/constants';
import Link from 'next/link';
import OuterLink from '../parts/OuterLink';
import { CookieSettingsButton } from '../lib/CookieSettingsButton';

const SOLA_STUDIO_URL = process.env.NEXT_PUBLIC_SOLA_STUDIO_URL;
const GITHUB_REPOSITORY_URL = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL;

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t text-sm text-slate-500 text-center space-y-3 bg-slate-50">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <Link
          href="/"
          className="underline hover:text-foreground transition-colors"
        >
          Contrast Checker
        </Link>
        <div className="hidden sm:inline">|</div>
        {GITHUB_REPOSITORY_URL && (
          <>
            <OuterLink
              href={GITHUB_REPOSITORY_URL}
              label="Source on GitHub"
              className="text-slate-500 underline hover:text-foreground transition-colors"
            />
            <div className="hidden sm:inline">|</div>
          </>
        )}

        <CookieSettingsButton className="underline hover:text-foreground transition-colors cursor-pointer">
          Cookie Settings
        </CookieSettingsButton>
        <div className="hidden sm:inline">|</div>
        <Link
          href="/privacy"
          className="underline hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
        <div className="hidden sm:inline">|</div>
        <Link
          href="/terms"
          className="underline hover:text-foreground transition-colors"
        >
          Terms
        </Link>
      </div>

      {SOLA_STUDIO_URL && (
        <p className="text-xs">
          Built by{' '}
          <OuterLink
            href={SOLA_STUDIO_URL}
            label="Sola Studio"
            className="underline hover:text-foreground transition-colors"
          />
          · Open source color contrast tool
        </p>
      )}

      <p className="text-xs">&copy; {thisYear} Sola Studio</p>
    </footer>
  );
};
