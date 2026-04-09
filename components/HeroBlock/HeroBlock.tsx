"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./HeroBlock.module.css";
import toast from "react-hot-toast";

export default function HeroBlock() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const searchQuery = query;
    console.log(searchQuery);

    if (!searchQuery) {
      toast("Введіть пошуковий запит");
      return;
    }

    router.push(`/locations/filter/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className={`section ${css.hero} ${css.section}`}>
      <div className="container">
        <h1 className={css.title}>
          Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
        </h1>
        <p className={css.text}>
          Тисячі перевірених локацій з реальними фото та відгуками від
          мандрівників.
        </p>
        <div className={css.searchBox}>
          <input
            className={`input ${css.input}`}
            type="text"
            placeholder="Введіть назву, тип або регіон..."
            value={query}
            onChange={(e) => setQuery(e.target.value.trim())}
          />
          <button
            className={`btn btn-base ${css.searchBtn}`}
            onClick={handleSearch}
          >
            Знайти місце
          </button>
        </div>
      </div>
    </section>
  );
}
