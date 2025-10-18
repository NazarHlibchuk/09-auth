'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function PrivateLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      {modal}
      <Footer />
    </>
  );
}
