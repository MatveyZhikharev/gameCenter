import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { calculateRelevanceScore } from '@/utils/recommendation';

const selectGamesState = (state: RootState) => state.games.items;
const selectFavoritesIds = (state: RootState) => state.favorites.items;

export const selectSelectedGame = (state: RootState) => state.games.selectedGame;
export const selectGamesLoading = (state: RootState) => state.games.loading;
export const selectGamesError = (state: RootState) => state.games.error;
export const selectSearchQuery = (state: RootState) => state.games.searchQuery;
export const selectFilters = (state: RootState) => state.games.filters;
export const selectSorting = (state: RootState) => state.games.sorting;
export const selectPagination = (state: RootState) => state.games.pagination;

export const selectGames = createSelector(
  [selectGamesState, selectFavoritesIds, selectSorting],
  (games, favoriteIds, sorting) => {
    const favoriteGames = games.filter((game) => favoriteIds.includes(game.id));

    const withRelevance = games.map((game) => ({
      ...game,
      relevance: calculateRelevanceScore(game, favoriteGames),
    }));

    const sorted = [...withRelevance];

    switch (sorting.field) {
      case 'relevance':
        sorted.sort((a, b) => {
          const diff = (a.relevance ?? 0) - (b.relevance ?? 0);
          return sorting.order === 'asc' ? diff : -diff;
        });
        break;
      case 'title':
        sorted.sort((a, b) =>
          sorting.order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        break;
      case 'release_date':
        sorted.sort((a, b) => {
          const aDate = new Date(a.release_date).getTime();
          const bDate = new Date(b.release_date).getTime();
          return sorting.order === 'asc' ? aDate - bDate : bDate - aDate;
        });
        break;
      case 'rating':
      default:
        sorted.sort((a, b) =>
          sorting.order === 'asc' ? a.rating - b.rating : b.rating - a.rating
        );
        break;
    }

    return sorted;
  }
);

export const selectHasActiveFilters = (state: RootState) => {
  const { filters, searchQuery } = state.games;
  return (
    filters.platforms.length > 0 ||
    filters.genres.length > 0 ||
    searchQuery.length > 0
  );
};

export const selectTotalPages = (state: RootState) => {
  const { pagination } = state.games;
  return Math.ceil(pagination.total / pagination.limit);
};
