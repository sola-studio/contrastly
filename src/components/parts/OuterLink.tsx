import { ExternalLink } from '@/lib/lucide';
import { cn } from '@/lib/clsx';

interface OuterLinkProps {
  href: string;
  className?: string;
  label: string;
  emoji?: string;
  underline?: boolean;
  hideIcon?: boolean;
}

export default function OuterLink({
  href = '',
  className = '',
  label = '',
  emoji = '',
  underline = true,
  hideIcon = false,
}: OuterLinkProps) {
  if (!label) return null;

  return (
    <a
      href={href}
      className={cn(
        ' text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
        className
      )}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span
        className={cn(
          'inline-flex gap-1 items-center',
          underline ? 'underline' : ''
        )}
      >
        {emoji && (
          <span aria-hidden="true" className="mr-1">
            {emoji}
          </span>
        )}
        {label}
        <span className="sr-only"> (opens in a new tab)</span>
        {!hideIcon && (
          <ExternalLink
            className="w-3 h-3 text-slate-600 ml-1"
            aria-hidden="true"
            focusable="false"
          />
        )}
      </span>
    </a>
  );
}
