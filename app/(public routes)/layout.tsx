import Footer from "@/components/Footer/Footer";
import "../globals.css";
import Header from "@/components/Header/Header";

export default function PublicLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="content">
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}
