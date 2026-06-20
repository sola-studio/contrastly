import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLinks } from '@/components/layout/SkipLinks';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SkipLinks />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="scroll-mt-24 focus:outline-none focus-visible:ring-2"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
