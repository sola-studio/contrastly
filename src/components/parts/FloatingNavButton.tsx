'use client';

import { colorPaletteSectionId } from '@/constants';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ArrowDown, ArrowUp } from '@/lib/lucide';
import { useEffect, useState } from 'react';

export default function FloatingNavButton() {
  const [showUp, setShowUp] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToPalette = () => {
    const el = document.getElementById(colorPaletteSectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const paletteTop =
        document.getElementById(colorPaletteSectionId)?.offsetTop ?? 0;
      setShowUp(window.scrollY + 200 >= paletteTop);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={showUp ? scrollToTop : scrollToPalette}
      className="fixed bottom-4 right-4 bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900 rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
      aria-label={
        showUp
          ? 'Back to top, where contrast results are displayed'
          : 'Go to color palette'
      }
    >
      {showUp ? (
        <ArrowUp size={24} aria-hidden="true" focusable="false" />
      ) : (
        <ArrowDown size={24} aria-hidden="true" focusable="false" />
      )}
    </button>
  );
}
