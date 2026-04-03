import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loadingContainer}>
      <strong className={css.loadingPharagraph}>Loading locations...</strong>
      <button className={css.loadingBtn} type="button">
        <span className={css.loader}></span>
      </button>
    </div>
  );
}
