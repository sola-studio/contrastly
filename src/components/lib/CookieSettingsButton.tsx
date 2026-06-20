'use client';

import * as CookieConsent from 'vanilla-cookieconsent';

interface CookieSettingsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function CookieSettingsButton({
  className,
  children = 'Cookie Settings',
}: CookieSettingsButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    CookieConsent.showPreferences();
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
