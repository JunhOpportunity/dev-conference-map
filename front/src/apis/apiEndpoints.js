const API_BASE_URL = "http://localhost:8081";

export const API_ENDPOINTS = {
  USER: {
    LOGIN: `${API_BASE_URL}/api/users/login`,
    REGISTER: `${API_BASE_URL}/api/users/post`,
  },
  BOARDS: {
    CREATE: `${API_BASE_URL}/api/posts/create`,
    GET_ALL: `${API_BASE_URL}/api/posts/all`,
  },
  CONFERENCES: {
    GET_ALL: `${API_BASE_URL}/api/conferences/all`,
  },
};

export default API_ENDPOINTS;
