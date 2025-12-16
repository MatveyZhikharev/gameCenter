import { useEffect, useState } from 'react';
import type { Game } from '@/types';
import { useExpressBackend, expressGamesApi, adminApi } from '@/api/expressClient';
import styles from './AdminPage.module.scss';

type EditableGame = Pick<
  Game,
  | 'id'
  | 'title'
  | 'description'
  | 'release_date'
  | 'rating'
  | 'platforms'
  | 'genres'
  | 'developer'
  | 'publisher'
  | 'cover_image'
> & { metacritic_score: number };

const EMPTY_GAME: EditableGame = {
  id: '',
  title: '',
  description: '',
  release_date: '',
  rating: 0,
  metacritic_score: 0,
  platforms: [],
  genres: [],
  developer: '',
  publisher: '',
  cover_image: '',
};

export const AdminPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(() => !!adminApi.getToken());

  const [games, setGames] = useState<Game[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [form, setForm] = useState<EditableGame>(EMPTY_GAME);
  const [saving, setSaving] = useState(false);
  const [loadingGames, setLoadingGames] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const backendEnabled = useExpressBackend;

  const loadGames = async () => {
    if (!backendEnabled || !isAuth) return;
    setLoadingGames(true);
    try {
      const { data } = await expressGamesApi.fetchGames({});
      setGames(data);
      if (data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
        setForm(toEditable(data[0]));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGames(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, [isAuth]);

  const toEditable = (game: Game): EditableGame => ({
    id: game.id,
    title: game.title,
    description: game.description,
    release_date: game.release_date,
    rating: game.rating,
    metacritic_score: game.metacritic_score ?? 0,
    platforms: game.platforms,
    genres: game.genres,
    developer: game.developer,
    publisher: game.publisher,
    cover_image: game.cover_image,
  });

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const game = games.find((g) => g.id === id);
    if (game) {
      setForm(toEditable(game));
    }
  };

  const handleFieldChange = <K extends keyof EditableGame>(key: K, value: EditableGame[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await adminApi.login(login, password);
      setIsAuth(true);
      setPassword('');
      setSaveMessage(null);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Ошибка входа');
    }
  };

  const handleLogout = () => {
    adminApi.logout();
    setIsAuth(false);
    setGames([]);
    setSelectedId('');
    setForm(EMPTY_GAME);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const updates = {
        title: form.title,
        description: form.description,
        release_date: form.release_date,
        rating: Number(form.rating),
        metacritic_score: Number(form.metacritic_score),
        platforms: form.platforms,
        genres: form.genres,
        developer: form.developer,
        publisher: form.publisher,
        cover_image: form.cover_image,
      };
      await expressGamesApi.updateGame(selectedId, updates);
      await loadGames();
      setSaveMessage('Изменения сохранены');
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  };

  const selectedGame = games.find((g) => g.id === selectedId);

  if (!backendEnabled) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Админ-панель</h1>
          <p className={styles.subtitle}>
            Включите Express backend (VITE_USE_EXPRESS_BACKEND=true), чтобы работать с базой данных.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Админ-панель</h1>
        <p className={styles.subtitle}>Редактирование игр в базе данных (обложка как ссылка)</p>
      </header>

      {!isAuth ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Вход</h2>
          <form className={styles.form} onSubmit={handleLogin}>
            <label className={styles.label}>
              Логин
              <input
                className={styles.input}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </label>
            <label className={styles.label}>
              Пароль
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {authError && <p className={styles.error}>{authError}</p>}
            <button className={styles.primaryButton} type="submit">
              Войти
            </button>
          </form>
        </section>
      ) : (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Игры</h2>
              <div className={styles.actions}>
                <button className={styles.button} onClick={loadGames} disabled={loadingGames}>
                  Обновить
                </button>
                <button className={styles.button} onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.list}>
                {loadingGames && <p className={styles.muted}>Загрузка...</p>}
                {!loadingGames && games.length === 0 && (
                  <p className={styles.muted}>Нет игр в базе. Добавьте их через API.</p>
                )}
                {games.map((game) => (
                  <button
                    key={game.id}
                    className={`${styles.gameItem} ${game.id === selectedId ? styles.active : ''}`}
                    onClick={() => handleSelect(game.id)}
                  >
                    <span className={styles.gameTitle}>{game.title}</span>
                    <span className={styles.gameMeta}>
                      {game.platforms.join(', ')} · {game.genres.join(', ')}
                    </span>
                  </button>
                ))}
              </div>

              {selectedGame && (
                <form className={styles.form} onSubmit={handleSave}>
                  <h3 className={styles.formTitle}>Редактировать игру</h3>
                  <label className={styles.label}>
                    Название
                    <input
                      className={styles.input}
                      value={form.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.label}>
                    Описание
                    <textarea
                      className={styles.textarea}
                      value={form.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      rows={4}
                    />
                  </label>
                  <div className={styles.row}>
                    <label className={styles.label}>
                      Рейтинг
                      <input
                        className={styles.input}
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={form.rating}
                        onChange={(e) => handleFieldChange('rating', Number(e.target.value))}
                      />
                    </label>
                    <label className={styles.label}>
                      Metacritic
                      <input
                        className={styles.input}
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        value={form.metacritic_score}
                        onChange={(e) =>
                          handleFieldChange('metacritic_score', Number(e.target.value))
                        }
                      />
                    </label>
                  </div>
                  <label className={styles.label}>
                    Дата релиза
                    <input
                      className={styles.input}
                      type="date"
                      value={form.release_date}
                      onChange={(e) => handleFieldChange('release_date', e.target.value)}
                    />
                  </label>
                  <label className={styles.label}>
                    Платформы (через запятую)
                    <input
                      className={styles.input}
                      value={form.platforms.join(', ')}
                      onChange={(e) =>
                        handleFieldChange(
                          'platforms',
                          e.target.value
                            .split(',')
                            .map((p) => p.trim())
                            .filter(Boolean) as typeof form.platforms
                        )
                      }
                    />
                  </label>
                  <label className={styles.label}>
                    Жанры (через запятую)
                    <input
                      className={styles.input}
                      value={form.genres.join(', ')}
                      onChange={(e) =>
                        handleFieldChange(
                          'genres',
                          e.target.value
                            .split(',')
                            .map((p) => p.trim())
                            .filter(Boolean) as typeof form.genres
                        )
                      }
                    />
                  </label>
                  <label className={styles.label}>
                    Обложка (URL)
                    <input
                      className={styles.input}
                      value={form.cover_image}
                      onChange={(e) => handleFieldChange('cover_image', e.target.value)}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </label>
                  <div className={styles.row}>
                    <label className={styles.label}>
                      Разработчик
                      <input
                        className={styles.input}
                        value={form.developer}
                        onChange={(e) => handleFieldChange('developer', e.target.value)}
                      />
                    </label>
                    <label className={styles.label}>
                      Издатель
                      <input
                        className={styles.input}
                        value={form.publisher}
                        onChange={(e) => handleFieldChange('publisher', e.target.value)}
                      />
                    </label>
                  </div>

                  {selectedGame.cover_image && (
                    <div className={styles.preview}>
                      <p className={styles.muted}>Превью обложки</p>
                      <img src={selectedGame.cover_image} alt={selectedGame.title} />
                    </div>
                  )}

                  {saveMessage && <p className={styles.info}>{saveMessage}</p>}
                  <button className={styles.primaryButton} type="submit" disabled={saving}>
                    {saving ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                </form>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
