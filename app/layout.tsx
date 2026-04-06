import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "Locationhub",
  description: "Website for location management",
  metadataBase: new URL("https://notehub.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Locationhub",
    description: "Website for locationhub management",
    url: "/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${montserrat.variable} app`}>
        <TanStackProvider>
          <AuthProvider>
            {children}
            {modal}
          </AuthProvider>
        </TanStackProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#d67d01",
              color: "#fff",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
