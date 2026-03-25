import { Metadata } from "next";

import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found page",
  description: "Page for not-existent pages",
  keywords: ["Next.js", "React", "Blog", "Notes"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Not found page",
    description: "Page for not-existent pages",
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

export default function NotFoundPage() {
  return (
    <div className={css.errorContainer}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
