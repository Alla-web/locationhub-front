import css from "./ErrorBox.module.css";

interface ErrorBoxProps {
  query?: string;
  errorMessage?: string;
}

export default function ErrorBox({ query, errorMessage }: ErrorBoxProps) {
  return (
    <div className={css.errorBox}>
      <p>Could not fetch the list of notes.</p>
      {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
      {query && (
        <p
          className={css.errorMessage}
        >{`No locations found with guwry: ${query}`}</p>
      )}
    </div>
  );
}
