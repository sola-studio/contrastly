'use client';

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export const SkipLink = ({ href, className, children }: Props) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        const id = e.currentTarget.getAttribute('href')?.slice(1);
        const el = id
          ? (document.getElementById(id) as HTMLElement | null)
          : null;
        if (el) {
          e.preventDefault();
          el.focus({ preventScroll: true });
          el.scrollIntoView({ block: 'start' });
        }
      }}
      className={`sr-only
           focus:not-sr-only focus:fixed focus:left-3 focus:z-100
           focus:bg-background focus:text-foreground focus:px-3 focus:py-2 focus:rounded-xs focus:outline
           focus-visible:not-sr-only focus-visible:fixed focus-visible:left-3 focus-visible:z-100
           focus-visible:bg-background focus-visible:text-foreground focus-visible:px-3 focus-visible:py-2
           focus-visible:rounded-md focus-visible:outline ${className ?? ''}`}
    >
      {children}
    </a>
  );
};
