import { cn } from '@/lib/clsx';
import { ReactNode } from 'react';

interface InlineTagWithEmojiProps extends React.HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement | HTMLLIElement
> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'li' | 'p';
  label?: string | ReactNode;
  emoji?: string;
  emojiPos?: 'before' | 'after';
  className?: string;
  id?: string;
  children?: ReactNode;
}

/**
 * NOTE: When using tag="li", place this inside <ul> or <ol>.
 * This component does not add list containers.
 */
export default function InlineTagWithEmoji({
  tag,
  label = '',
  emoji,
  emojiPos = 'before',
  className = '',
  id,
  children,
  ...restProps
}: InlineTagWithEmojiProps) {
  const Tag = tag;
  const emojiElem = (
    <span
      aria-hidden="true"
      role="presentation"
      className={cn(emojiPos === 'before' ? 'mr-2' : 'ml-2')}
    >
      {emoji}
    </span>
  );

  if (!label && !children) return null;

  return (
    <Tag
      className={
        tag === 'li' ? cn('list-none', className, 'flex gap-1') : className
      }
      {...(id ? { id } : {})}
      {...restProps}
    >
      {emojiPos === 'before' && emoji && emojiElem}
      {label || children}
      {emojiPos === 'after' && emoji && emojiElem}
    </Tag>
  );
}
