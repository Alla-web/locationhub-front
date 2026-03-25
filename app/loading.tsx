import css from './loading.module.css';

export default function Loading() {
  return (
    <div className={css.loaderContainer}>
      <strong className={css.loadingPharagraph}>Notes loading ...</strong>

      <button className={css.loadingBtn} type="button">
        <span className={css.loader}></span>
      </button>
    </div>
  );
}
