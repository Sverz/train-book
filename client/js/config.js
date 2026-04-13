const ENV = (typeof window !== 'undefined' && window.__ENV__) ?? {};
export const API_URL = ENV.API_URL ?? 'http://localhost:3000';
export const WS_URL  = ENV.WS_URL  ?? 'http://localhost:3000';