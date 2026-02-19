import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location;

    // 1. Gestion des Sandboxes (ton code actuel)
    if (hostname.includes('.sandbox.')) {
      return origin.replace('5173', '8000') + '/api/v1';
    }

    // 2. Gestion de ta machine Linux (qual-darwin) ou IP distante
    // Si on n'est pas sur localhost pur, on utilise le hostname actuel avec le port 8000
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}:8000/api/v1`;
    }
  }

  // 3. Fallback par défaut
  return 'http://localhost:8000/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  }
});

// Garde le reste de tes fonctions (downloadDat, previewDat) identiques
export type ExportFormat = 'docx' | 'pdf' | 'odt';

export async function downloadDat(data: unknown, format: ExportFormat = 'docx') {
  const response = await api.post(`/generate?format=${format}`, data, {
    responseType: 'blob',
  });
  return response.data;
}

export async function previewDat(data: unknown): Promise<string> {
  const response = await api.post('/generate?format=pdf', data, {
    responseType: 'blob',
  });
  return new Promise((resolve) => {
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    resolve(url);
  });
}

export default api;