import axios from 'axios';
import { API_KEY } from './myapikey';
const BASE_URL = 'https://pixabay.com/api/';

export async function getData(searchQuery, perPage = 1) {
  const { data } = await axios.get(
    `${BASE_URL}?q=${searchQuery}&key=${API_KEY}&page=${perPage}&image_type=photo&orientation=horizontal&per_page=12`
  );
  //   console.log(data);
  return data;
}
