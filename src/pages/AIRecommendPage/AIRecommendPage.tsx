import styles from './AIRecommendPage.module.scss';

const MOODS = ['relaxed', 'excited', 'competitive', 'adventurous', 'strategic', 'immersive'];

export const AIRecommendPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI подбор игр</h1>
        <p className={styles.subtitle}>
          Рекомендации по настроению на основе GameMatch AI и ваших избранных игр
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Доступные настроения</h2>
        <div className={styles.moods}>
          {MOODS.map((mood) => (
            <span key={mood} className={styles.moodBadge}>
              {mood}
            </span>
          ))}
        </div>
        <p className={styles.hint}>
          Используйте эндпоинт <code>/api/ai/recommend</code> для получения рекомендаций или
          подключите собственный клиент к этому экрану.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Как это работает</h2>
        <ul className={styles.list}>
          <li>⚙️ Алгоритм релевантности 0-100% с весами жанров, платформ, рейтинга и даты</li>
          <li>🧠 Анализ ваших избранных игр для более точных совпадений</li>
          <li>🎨 Цветовая индикация качества подбора прямо на карточках игр</li>
        </ul>
      </section>
    </div>
  );
};
