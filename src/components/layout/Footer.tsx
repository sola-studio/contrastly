import { thisYear } from '@/constants';
import Link from 'next/link';
import OuterLink from '../parts/OuterLink';
import { CookieSettingsButton } from '../lib/CookieSettingsButton';

const SOLA_STUDIO_URL = process.env.NEXT_PUBLIC_SOLA_STUDIO_URL;
const GITHUB_REPOSITORY_URL = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL;

const classNameForLink =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:rounded-xs text-slate-600 underline hover:text-blue-700 transition-colors';

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t text-sm text-slate-600 text-center space-y-3 bg-slate-50">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <Link href="/" className={classNameForLink}>
          Contrast Checker
        </Link>
        <div className="hidden sm:inline">|</div>
        {GITHUB_REPOSITORY_URL && (
          <>
            <OuterLink
              href={GITHUB_REPOSITORY_URL}
              label="Source on GitHub"
              className={classNameForLink}
            />
            <div className="hidden sm:inline">|</div>
          </>
        )}

        <CookieSettingsButton className={classNameForLink}>
          Cookie Settings
        </CookieSettingsButton>
        <div className="hidden sm:inline">|</div>
        <Link href="/privacy" className={classNameForLink}>
          Privacy Policy
        </Link>
        <div className="hidden sm:inline">|</div>
        <Link href="/terms" className={classNameForLink}>
          Terms
        </Link>
      </div>

      {SOLA_STUDIO_URL && (
        <p className="text-xs">
          Built by{' '}
          <OuterLink
            href={SOLA_STUDIO_URL}
            label="Sola Studio"
            className={classNameForLink}
          />
          · Open source color contrast tool
        </p>
      )}

      <p className="text-xs">&copy; {thisYear} Sola Studio</p>
    </footer>
  );
};
