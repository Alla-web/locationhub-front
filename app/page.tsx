import { Metadata } from "next";

import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Locationhub home page",
  description: "Location management website home page",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Locationhub home page",
    description: "Notes management website home page",
    url: "/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Locationhub",
      },
    ],
  },
};

export default function Home() {
  return (
    <div>
      <main>
        <div className={css.container}>
          <h1 className={css.title}>Welcome to Locationhub</h1>
          <p className={css.description}>
            Locationhub is a simple and efficient application designed for
            managing personal notes. It helps keep your thoughts organized and
            accessible in one place, whether you are at home or on the go.
          </p>
        </div>
      </main>
    </div>
  );
}
