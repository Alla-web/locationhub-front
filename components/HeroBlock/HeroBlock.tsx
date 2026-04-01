"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./HeroBlock.module.css";

export default function HeroBlock() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/locations?search=${query}`);
  };

  return (
    <section className={css.hero}>
      <div className="container section">
        <h1 className={css.title}>
          Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
        </h1>
        <p className={css.text}>
          Тисячі перевірених локацій з реальними фото та відгуками від
          мандрівників.
        </p>
        <div className={css.search}>
          <input
            className={`input ${css.inputResearch}`}
            type="text"
            placeholder="Введіть назву, тип або регіон..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
