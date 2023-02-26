import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:8000';
const token = process.env.CLERK_SECRET_KEY
export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

