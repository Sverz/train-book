import { API_URL } from './config.js';

export async function request(url, options = {}) {
  const token = localStorage.getItem('token');

  const res = await fetch(API_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = '/login.html';
    throw Object.assign(new Error('Unauthorized'), { status: 401 });
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(
      new Error(err.message ?? 'API error'),
      { status: res.status }
    );
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}