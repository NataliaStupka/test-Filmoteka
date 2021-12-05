import './sass/main.scss';
import {fetchMovies} from './api'

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    buttonLoadMore: document.querySelector('.load-more'),
}



// Запрос за популярными фильмами

fetchMovies().then(film => renderFilm(film));


// запрос за жанрами
// fetch(`${BASE_URL}/3/genre/movie/list?api_key=${key}`).then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw Error('This is Error');
// }).then(console.log('запрос за жанрами'));


// Ganre==================================
const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }];
    
// ==========================================     https://image.tmdb.org/t/p/original/{{poster_path}}

function renderFilm(films) {

    console.log('Тут разметка фильмов', films.data.results)
    

    const filmsArray = films.data.results;
    const markup = filmsArray.map(film => `
        <div class="gallery-item">
            <a class="link" href="#">
                <div class="photo-card">
                    <img class="photo-img" src="${`https://image.tmdb.org/t/p/original/${film.poster_path}`}" alt="Постер ${film.title}"  />
                    <div class="info">
                        <p> ${film.title}</p>
                        <p> Жанр: ${film.genre_ids} | ${film.release_date} </p>
                    </div>
                </div>
            </a>
        </div>
        `).join('');
    
     refs.gallery.insertAdjacentHTML('beforeend', markup);
}