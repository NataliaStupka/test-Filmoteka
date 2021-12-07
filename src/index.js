import './sass/main.scss';
import { genres } from './js/common/genres';
import { fetchMovies } from './js/helpers/api';
import { STORAGE_HOME_KEY } from "./js/common/keys";

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    buttonLoadMore: document.querySelector('.load-more'),
}


// Запрос за популярными фильмами
fetchMovies().then(film => renderFilm(film));


// ================================================    


function renderFilm(films) {
    console.log('Тут разметка фильмов', films.data.results)
    const filmsArray = films.data.results; //массив с обьектами, все фильмы
  
    const markup = filmsArray.map(film => {
        // ----дата выхода фильма
        const releseDateMovies = film.release_date;
        const releseData = (releseDateMovies.split("-"))[0];  //дата выхода по разделителю (и 0-му индексу масива)
        // const releseData = releseDateMovies.slice(0, 4);  //дата выхода(убирает слайсом два последних числа)

        //-----это для модалки популярность
        const ratingMovie = Number(film.popularity).toFixed(1);
        
        // ----рендерим жанры
            // console.log('Все жанры 1-го фильма (номера):', film.genre_ids)
        const genresArray = film.genre_ids.reduce((acc, id) => {
            let genreToFind = genres.find(genre => genre.id === id); //genre - {id, name}
            // console.log(genreToFind); //genres - [{id,name},{id,name},...]; genreToFind - {id,name}
      if (genreToFind) {
          acc.push(genreToFind.name);
        //   console.log('1жанр:', genreToFind.name)
            }
            
      return acc;
    }, []);
        console.log('Все жанры фльма(словами)', genresArray)

        //больше трех жанров - Other
        if (genresArray.length > 3) {
            genresArray.splice(3);
            genresArray[2] = 'Other';
        } else if (genresArray.length === 0) {
            genresArray[0] = 'Genre Unknown';
        }
                                                                // https://image.tmdb.org/t/p/original/{{poster_path}}
        return `
        <li class="gallery-item list">
            <a class="link" href="#">
                <div class="photo-card">
                    <img class="photo-img" src="${`https://image.tmdb.org/t/p/original/${film.poster_path}`}" alt="Постер ${film.title}"  />
                    <div class="info">
                        <p class=movie-title> ${film.title}</p>
                        <p class=movie-text-data> Жанр: ${genresArray} | ${releseData} <span class='raiting-movie'>${film.vote_average}</span></p>
                    </div>
                </div>
            </a>
        </li>
        `}).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    // массив популярных фильмов в LocalStorage
    localStorage.setItem(STORAGE_HOME_KEY, JSON.stringify(filmsArray));
}

// получение данных с LocalStorage
// const theme = localStorage.getItem(STORAGE_HOME_KEY)
// console.log('с локала стороджа', JSON.parse(theme))