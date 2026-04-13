export function requireAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    throw new Error('Not authenticated');
  }
}

export function requireAdmin() {
  const role = localStorage.getItem('userRole');
  if (role !== 'admin') {
    window.location.href = '/index.html';
    throw new Error('Forbidden');
  }
}