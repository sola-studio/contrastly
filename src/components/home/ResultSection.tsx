import { sampleText } from '@/constants';
import { formatContrastLikeWebAIM } from '@/helpers/contrasts';
import { useStatusSrTextWithAriaBusy } from '@/hooks/useStatusSrTextWithAriaBusy';
import { BookOpenIcon, ExternalLink, InfoIcon } from '@/lib/lucide';
import { SelectedColorState, WCAGCheckSize, WCAGType } from '@/types/content';
import Link from 'next/link';
import InlineTagWithEmoji from '../parts/InlineTagWithEmoji';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ResultSectionProps {
  checkPass: (ratio: number, type: WCAGType, size: WCAGCheckSize) => boolean;
  contrast: number;
  bg: SelectedColorState;
  fg: SelectedColorState;
}

export default function ResultSection({
  checkPass,
  contrast,
  bg,
  fg,
}: ResultSectionProps) {
  const aaNormal = checkPass(contrast, 'AA', 'normal');
  const aaLarge = checkPass(contrast, 'AA', 'large');
  const aaaNormal = checkPass(contrast, 'AAA', 'normal');
  const aaaLarge = checkPass(contrast, 'AAA', 'large');

  const { statusRef, busy, srText } = useStatusSrTextWithAriaBusy({
    contrast,
    aaNormal,
    aaLarge,
    aaaNormal,
    aaaLarge,
  });

  const statusText = (isPass: boolean, type: WCAGType) => {
    return (
      <InlineTagWithEmoji
        tag={'p'}
        emoji={isPass ? '✅' : '❌'}
        emojiPos="after"
      >
        <span className="text-xs mr-1 tracking-wider">WCAG {type}:</span>
        <span className="text-sm font-medium uppercase tracking-wider">
          {isPass ? 'Pass' : 'Fail'}
        </span>
      </InlineTagWithEmoji>
    );
  };

  return (
    <section
      className="px-6 py-6 sm:p-6 w-full bg-slate-50 border shadow sm:max-w-105 xl:flex xl:flex-col xl:justify-center lg:items-start text-slate-700"
      aria-labelledby="contrast-check-result"
    >
      <h2
        className="text-base font-sm mb-4 uppercase tracking-widest text-slate-700"
        id="contrast-check-result"
      >
        Contrast Check Results
      </h2>
      <p className="mb-5">
        <span className="text-xs text-slate-600 mr-1">Contrast ratio: </span>
        <span className="font-medium text-2xl">
          {formatContrastLikeWebAIM(contrast)}
        </span>
      </p>
      <p
        role="status"
        aria-live="polite"
        className="sr-only"
        ref={statusRef}
        aria-atomic="true"
        aria-busy={busy || undefined}
      >
        {srText}
      </p>
      <div className="space-y-3 lg:flex lg:flex-row lg:justify-between lg:gap-3">
        {/* Normal text */}
        <div className="mb-8 xl:mb-4 lg:mb-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-600">Normal Text</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="What counts as normal text?"
                  className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <InfoIcon
                    className="w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Text smaller than 18px (non-bold) or smaller than 14px (bold).
                Requires a minimum contrast ratio of 4.5:1 (AA) or 7:1 (AAA).
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="mb-2">
            {statusText(aaNormal, 'AA')}
            {statusText(aaaNormal, 'AAA')}
          </div>
          {/* Sample Display */}
          <div
            className="px-2 py-1.5 bg-muted rounded text-sm text-center border lg:mt-4 lg:w-42 lg:h-10 lg:flex lg:items-center lg:justify-center lg:p-0 tracking-wider"
            style={{
              fontWeight: 'normal',
              backgroundColor: bg.hex,
              color: fg.hex,
            }}
            aria-hidden="true"
          >
            {sampleText}
          </div>
        </div>
        {/* Large text */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-600">Large Text</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="What counts as large text?"
                  className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <InfoIcon
                    className="w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Text at least 18px regular or 14px bold. Requires a minimum
                contrast ratio of 3:1 (AA) or 4.5:1 (AAA).
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="mb-2">
            {statusText(aaLarge, 'AA')}
            {statusText(aaaLarge, 'AAA')}
          </div>
          {/* Sample Display */}
          <div
            className="px-2 py-1.5 rounded text-sm text-center border lg:mt-4 lg:w-42 lg:h-10 lg:flex lg:items-center lg:justify-center lg:p-0 tracking-wider"
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              backgroundColor: bg.hex,
              color: fg.hex,
            }}
            aria-hidden="true"
          >
            {sampleText}
          </div>
        </div>
      </div>
    </section>
  );
}
