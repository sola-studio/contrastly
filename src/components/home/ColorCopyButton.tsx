import { errorToastify, successToastify } from '@/lib/toast';
import { cn } from '@/lib/clsx';
import { SelectedColorState } from '@/types/content';
import { CopyIcon } from '@/lib/lucide';

interface ColorCopyButtonProps {
  targetColor: SelectedColorState;
}

export default function ColorCopyButton({
  targetColor,
  className,
  ...props
}: ColorCopyButtonProps & React.ComponentProps<'button'>) {
  const handleCopyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      successToastify('Copied to clipboard!');
    } catch {
      errorToastify('Failed to copy. Please try again.');
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleCopyHex(targetColor.hex)}
      className={cn(
        'inline-flex items-center justify-center h-12 min-w-12 p-2',
        'text-sm rounded-md border bg-gray-100 hover:bg-gray-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
        className
      )}
      {...props}
    >
      <CopyIcon size={15} />
      <span className="sr-only">Copy</span>
      <span className="sr-only">
        {targetColor.name} {targetColor.hex}
      </span>
    </button>
  );
}
