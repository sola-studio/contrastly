import ContrastChecker from '@/components/home/ContrastChecker';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ToastContainer } from 'react-toastify';
import About from '@/components/home/About';
import { SkipLinks } from '@/components/layout/SkipLinks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrastly – Tailwind CSS Color Contrast Checker | Sola Studio',
  description:
    'Use Contrastly to check WCAG color contrast between Tailwind CSS colors, custom hex values, and semantic color tokens in your browser.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <SkipLinks />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="scroll-mt-24 focus:outline-none focus-visible:ring-2"
      >
        <ContrastChecker />
      </main>
      <About />
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        closeOnClick={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
