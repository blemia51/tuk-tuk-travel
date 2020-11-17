function getBaseUrl() {
  let source = 'localhost';
  if (process.env.NODE_ENV === 'production') {
    source = window.location.hostname;
  }
  return `https://${source}`;
}

export const BASE_URL = getBaseUrl();
export const TIMEOUT = 15000;
