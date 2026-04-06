import { Metadata } from "next";

import css from "./page.module.css";

import HeroBlock from "@/components/HeroBlock/HeroBlock";
import AdvantagesBlock from "@/components/AdvantagesBlock/AdvantagesBlock";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PopularLocationsBlock from "@/components/PopularLocationsBlock/PopularLocationsBlock";
import ReviewsBlock from "@/components/ReviewsBlock/ReviewsBlock";

export const metadata: Metadata = {
  title: "Locationhub home page",
  description: "Location management website home page",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Locationhub home page",
    description: "Locations management website home page",
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

export default function HomePage() {
  return (
    <main className={css.main}>
      <Header />
      <HeroBlock />
      <AdvantagesBlock />
      <PopularLocationsBlock />
      <ReviewsBlock />
      <Footer />
    </main>
  );
}
