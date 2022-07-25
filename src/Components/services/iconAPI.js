import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '25850383-0594824d414b581d9c15cc922'; 

const getIconsApi = (query, page) => {
  return axios(
      `${API_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
  
    .then(response => response.data.hits);
  }

export default getIconsApi;