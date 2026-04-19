import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex w-full grow flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
