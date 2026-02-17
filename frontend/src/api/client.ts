import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

export const downloadDat = async (data: any) => {
    const response = await api.post('/generate', data, {
        responseType: 'blob',
    });
    return response.data;
};