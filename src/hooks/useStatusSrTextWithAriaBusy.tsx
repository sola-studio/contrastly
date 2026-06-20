import { formatContrastLikeWebAIM } from '@/helpers/contrasts';
import { useEffect, useRef, useState } from 'react';

interface UseStatusSrTextWithAriaBusyProps {
  contrast: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

export function useStatusSrTextWithAriaBusy({
  contrast,
  aaNormal,
  aaLarge,
  aaaNormal,
  aaaLarge,
}: UseStatusSrTextWithAriaBusyProps) {
  // Update the live region only once when consecutive changes settle (e.g., 200–300ms)
  // Set aria-busy="true" while changes are happening, and update the text when settled
  // Many screen readers behave as "do not read while busy → read only the latest after busy is cleared", canceling/merging previous readings

  const [srText, setSrText] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const statusSrText =
    `Contrast ratio ${formatContrastLikeWebAIM(contrast)} to 1. ` +
    `AA normal ${aaNormal ? 'pass' : 'fail'}, ` +
    `AA large ${aaLarge ? 'pass' : 'fail'}, ` +
    `AAA normal ${aaaNormal ? 'pass' : 'fail'}.` +
    `AAA large ${aaaLarge ? 'pass' : 'fail'}`;

  // While changes are happening, set busy to true, and once settled, update the text
  useEffect(() => {
    setBusy(true);
    const t = setTimeout(() => {
      setBusy(false);
      setSrText(statusSrText);
    }, 250); // Adjust as needed, e.g., 150–400ms
    return () => clearTimeout(t);
  }, [statusSrText]);

  return {
    statusRef,
    busy,
    srText,
  };
}
