import axios from 'axios';

const apiClient = axios.create({
  // baseURL: `${process.env.API_SERVI_URL}`,
  baseURL: `https://sports-api.azurewebsites.net/api`
});

// console.log('baseURL', `${process.env.API_SERVI_URL}`)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error);
    }
    if (error.response.status === 403) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);


const utilityApi = {
  getSports: () => apiClient.get('/Sports'),
  getSport: (id) => apiClient.get(`/Sports/${id}`)
};

export default {
  utilityApi,
};
