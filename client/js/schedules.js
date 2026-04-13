import { request } from './http.js';

export function getSchedules(search = '') {
  return request(`/schedules?search=${encodeURIComponent(search)}`);
}

export function createSchedule(data) {
  return request('/schedules', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteSchedule(id) {
  return request(`/schedules/${id}`, {
    method: 'DELETE',
  });
}
