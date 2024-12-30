import '../../styles/globals.css';
import Footer from './_components/Footer';
import Header from './_components/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">{children}</main>
      <Footer />
    </>
  );
}
