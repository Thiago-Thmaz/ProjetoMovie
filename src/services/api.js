import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=e0625846a46f36d126e56d1454ab8d05&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;