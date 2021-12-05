import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org'
const key = '8467b35301383f6844ef88f323a204bb';

export async function fetchMovies() {
    const url = `${BASE_URL}/3/trending/movie/day?api_key=${key}`;
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


