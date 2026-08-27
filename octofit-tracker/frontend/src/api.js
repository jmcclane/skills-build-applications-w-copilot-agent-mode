const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (payload.data && typeof payload.data === 'object') {
    return collectionFromResponse(payload.data);
  }
  return [];
}

export async function fetchCollection(endpoint) {
  const path = endpoint.startsWith('/api/') ? endpoint : `/api/${endpoint}/`;
  const response = await fetch(endpoint.startsWith('http') ? endpoint : `${apiBaseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return collectionFromResponse(await response.json());
}
