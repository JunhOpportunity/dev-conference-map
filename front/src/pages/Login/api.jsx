import axios from 'axios';

const API_URL = 'https://api.example.com';

export const signIn = async (credentials) => {
  return await axios.post(`${API_URL}/signin`, credentials);
};

export const signUp = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

