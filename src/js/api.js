import axios from "axios";
import { API_Key } from "./common/keys";

const BASE_URL = 'https://api.themoviedb.org'

export async function fetchMovies() {
    const url = `${BASE_URL}/3/trending/movie/day?api_key=${API_Key}`;
    return await axios.get(url);

 }
//  в проет но пока не получилось

// import { fetchMovies } from './js/api-service-popular';
// import itemsTemplate from './templates/movies-items.hbs'
// import { genres } from './js/common/genres'
// const refs = {
//     popularMovie: document.querySelector('.list-card'),
// }

// let arrayMovies = []
// fetchMovies().then(film => {
//     console.log('массив фильмов', film.data.results)
//     return arrayMovies = film.data.results;
    
// });
// const formattedData = fetchMovies(arrayMovies, genres);
// const markup = itemsTemplate({ ...formattedData });
// refs.popularMovie.insertAdjacentHTML('beforeend', markup);

// -----------------------------------------------------------