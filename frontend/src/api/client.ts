import axios from 'axios';

// Détection automatique de l'environnement
const getBaseUrl = () => {
  // Si on est sur un sandbox (URL contient .sandbox.)
  if (window.location.hostname.includes('.sandbox.')) {
    // Remplacer le port frontend (5173) par le port backend (8000)
    return window.location.origin.replace('5173', '8000') + '/api/v1';
  }
  // Sinon, localhost en développement
  return 'http://localhost:8000/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

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
  const blob = new Blob([response.data], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

export default api;
