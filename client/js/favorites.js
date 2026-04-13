import { request } from './http.js';

export function getFavorites() {
  return request('/favorites');
}

export function addFavorite(scheduleId) {
  return request(`/favorites/${scheduleId}`, { method: 'POST' });
}

export function removeFavorite(scheduleId) {
  return request(`/favorites/${scheduleId}`, { method: 'DELETE' });
}
