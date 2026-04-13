import { request } from './http.js';

export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem('token', data.access_token);

  const payload = JSON.parse(atob(data.access_token.split('.')[1]));
  localStorage.setItem('userRole',  payload.role);
  localStorage.setItem('userId',    String(payload.sub));

  return payload;
}

export function logout() {
  localStorage.clear();
  window.location.href = '/login.html';
}
