import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', //
  withCredentials: true, // cookies працюють
  headers: {
    'Content-Type': 'application/json',
  },
});
