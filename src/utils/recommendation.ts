import type { Game } from '@/types';

const WEIGHTS = {
  genres: 0.4,
  platforms: 0.25,
  rating: 0.2,
  releaseDate: 0.15,
} as const;

const WEIGHT_SUM = WEIGHTS.genres + WEIGHTS.platforms + WEIGHTS.rating + WEIGHTS.releaseDate;
const RATING_SENSITIVITY = 10;
const YEAR_SENSITIVITY = 10;

const collectToSet = <T>(games: Game[], selector: (game: Game) => T[]) => {
  const result = new Set<T>();
  games.forEach((game) => {
    selector(game).forEach((value) => result.add(value));
  });
  return result;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const average = (values: number[]) => {
  const finiteValues = values.filter((v) => Number.isFinite(v));
  return finiteValues.length === 0
    ? 0
    : finiteValues.reduce((sum, value) => sum + value, 0) / finiteValues.length;
};

const parseYear = (dateString: string) => {
  const year = new Date(dateString).getFullYear();
  return Number.isFinite(year) ? year : 0;
};

const getSharedRatio = (values: string[], reference: Set<string>) => {
  if (reference.size === 0) return 0;
  const shared = values.filter((value) => reference.has(value)).length;
  return (shared / reference.size) * 100;
};

export const calculateRelevanceScore = (game: Game, favoriteGames: Game[]): number => {
  if (favoriteGames.length === 0) return 0;

  const favoriteGenres = collectToSet(favoriteGames, (item) => item.genres);
  const favoritePlatforms = collectToSet(favoriteGames, (item) => item.platforms);
  const averageRating = average(favoriteGames.map((item) => item.rating));
  const averageReleaseYear = average(favoriteGames.map((item) => parseYear(item.release_date)));

  const genreScore = getSharedRatio(game.genres ?? [], favoriteGenres);
  const platformScore = getSharedRatio(game.platforms ?? [], favoritePlatforms);

  const ratingDiff = Math.abs((Number.isFinite(game.rating) ? game.rating : 0) - averageRating);
  const ratingScore = clamp(100 - ratingDiff * RATING_SENSITIVITY, 0, 100);

  const releaseDiff = Math.abs(parseYear(game.release_date) - averageReleaseYear);
  const releaseScore = clamp(100 - releaseDiff * YEAR_SENSITIVITY, 0, 100);

  const relevance =
    (genreScore * WEIGHTS.genres +
      platformScore * WEIGHTS.platforms +
      ratingScore * WEIGHTS.rating +
      releaseScore * WEIGHTS.releaseDate) /
    WEIGHT_SUM;

  return Math.round(clamp(relevance, 0, 100));
};

export const getRelevanceVariant = (score: number) => {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  if (score >= 25) return 'low';
  return 'minimal';
};
