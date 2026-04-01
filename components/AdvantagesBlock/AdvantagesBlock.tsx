import css from "./AdvantagesBlock.module.css";

const advantages = [
  {
    id: 1,
    iconId: "icon-select_check_box",
    title: "Реальні відгуки",
    text: "Користувачі діляться чесними враженнями, щоб ви робили правильний вибір.",
  },
  {
    id: 2,
    iconId: "icon-filter_alt",
    title: "Зручні фільтри",
    text: "Шукайте за типом локації, регіоном, наявністю зручностей та іншими критеріями.",
  },
  {
    id: 3,
    iconId: "icon-communication",
    title: "Спільнота мандрівників",
    text: "Додавайте власні улюблені місця та діліться своїми неймовірними знахідками.",
  },
];

export default function AdvantagesBlock() {
  return (
    <section className={`section ${css.section}`}>
      <div className={`container ${css.container}`}>
        <h2 className={css.title}>Ключові переваги</h2>

        <ul className={css.list}>
          {advantages.map(({ id, iconId, title, text }) => (
            <li key={id} className={css.card}>
              <svg className={css.icon} aria-hidden="true">
                <use href={`/icons.svg#${iconId}`} />
              </svg>

              <h3 className={css.cardTitle}>{title}</h3>
              <p className={css.cardText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
