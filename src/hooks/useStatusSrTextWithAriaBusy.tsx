import { formatContrastLikeWebAIM } from '@/helpers/contrasts';
import { useEffect, useRef, useState } from 'react';

interface UseStatusSrTextProps {
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
}: UseStatusSrTextProps) {
  const [srText, setSrText] = useState('');
  const [busy, setBusy] = useState(false);
  const isInitialRender = useRef(true);

  const spokenContrastRatio = formatContrastLikeWebAIM(contrast).replace(
    ':1',
    ' to 1'
  );

  const statusSrText = [
    `Contrast ratio ${spokenContrastRatio}.`,
    `Normal text: AA ${aaNormal ? 'pass' : 'fail'}, AAA ${
      aaaNormal ? 'pass' : 'fail'
    }.`,
    `Large text: AA ${aaLarge ? 'pass' : 'fail'}, AAA ${
      aaaLarge ? 'pass' : 'fail'
    }.`,
  ].join(' ');

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setBusy(true);

    const timeoutId = window.setTimeout(() => {
      setSrText(statusSrText);
      setBusy(false);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [statusSrText]);

  return {
    busy,
    srText,
  };
}
