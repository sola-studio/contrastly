'use client';

import { colorPaletteSectionId } from '@/constants';
import { usePathname } from 'next/navigation';
import { SkipLink } from '../parts/SkipLink';

export const SkipLinks = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Skip links">
      <ul>
        <li>
          <SkipLink href="#main" className="focus:top-3 focus-visible:top-3">
            Skip to content
          </SkipLink>
        </li>
        {pathname === '/' && (
          <li>
            <SkipLink
              href={`#${colorPaletteSectionId}`}
              className="focus:top-12 focus-visible:top-12"
            >
              Skip to color palette
            </SkipLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
