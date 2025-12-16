import { calculateRelevanceScore, getRelevanceVariant } from './recommendation';
import type { Game } from '@/types';

const baseGame: Game = {
  id: 'base',
  title: 'Base Game',
  description: '',
  release_date: '2023-01-01',
  rating: 8.5,
  metacritic_score: 80,
  platforms: ['PC', 'PlayStation'],
  genres: ['Action', 'RPG'],
  developer: '',
  publisher: '',
  cover_image: '',
  screenshots: [],
  created_at: '',
  updated_at: '',
};

const favoriteGame: Game = {
  ...baseGame,
  id: 'fav',
  title: 'Favorite',
};

describe('recommendation utils', () => {
  it('returns 0 relevance without favorites', () => {
    expect(calculateRelevanceScore(baseGame, [])).toBe(0);
  });

  it('rewards shared genres and platforms', () => {
    const differentGame: Game = {
      ...baseGame,
      genres: ['Strategy'],
      platforms: ['Nintendo'],
    };

    const sharedScore = calculateRelevanceScore(baseGame, [favoriteGame]);
    const differentScore = calculateRelevanceScore(differentGame, [favoriteGame]);

    expect(sharedScore).toBeGreaterThan(differentScore);
  });

  it('caps score at 100', () => {
    const highRatingGame = { ...baseGame, rating: 10 };
    expect(calculateRelevanceScore(highRatingGame, [favoriteGame])).toBeLessThanOrEqual(100);
  });

  it('maps score to variant thresholds', () => {
    expect(getRelevanceVariant(80)).toBe('high');
    expect(getRelevanceVariant(60)).toBe('medium');
    expect(getRelevanceVariant(30)).toBe('low');
    expect(getRelevanceVariant(10)).toBe('minimal');
  });
});
