import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://superheroapi.com/api/10220563303568385',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
