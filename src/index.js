import './sass/main.scss';
import { genres } from './js/common/genres';
import { fetchMovies } from './js/api';
import { STORAGE_HOME_KEY } from "./js/common/keys";

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    buttonLoadMore: document.querySelector('.load-more'),
}


// Запрос за популярными фильмами
fetchMovies().then(film => renderFilm(film));

// Ganre==================================
  // ???
// function genreMovie() {
//     const keys = Object.keys(genres);
//     const values = Object.values(genres);

//     const one = genres.map(genre => {
//         const ganreId = genre.id;
//         const ganreName = genre.name;
//       console.log(`${ganreId} - ${ganreName}`)
//    })
// }
// genreMovie()
console.log('genres', genres)
 for (let genre of genres) {
        console.log(`${genre.id} - ${genre.name}`)
    }
// ==========================================     https://image.tmdb.org/t/p/original/{{poster_path}}

function renderFilm(films) {

    console.log('Тут разметка фильмов', films.data.results)

    const filmsArray = films.data.results;
    const markup = filmsArray.map(film => {
        const releseDateMovies = film.release_date;
        const releseData = (releseDateMovies.split("-"))[0];
        // const releseData = releseDateMovies.slice(0, 4);

        // console.log('дата выхода по разделителю (и 0-му индексу масива):', (releseDateMovies.split("-"))[0])
        // console.log('дата выхода(убрала слайсом два последних):', releseDateMovies.slice(0,4))
        
        return `
        <li class="gallery-item list">
            <a class="link" href="#">
                <div class="photo-card">
                    <img class="photo-img" src="${`https://image.tmdb.org/t/p/original/${film.poster_path}`}" alt="Постер ${film.title}"  />
                    <div class="info">
                        <p class=movie-title> ${film.title}</p>
                        <p class=movie-text-data> Жанр: ${film.genre_ids} | ${releseData} </p>
                    </div>
                </div>
            </a>
        </li>
        `}).join('');
    
     refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// ?? LocalStorage
localStorage.setItem(STORAGE_HOME_KEY, JSON.stringify());