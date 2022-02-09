import { genres } from '../common/genres';  //жанры
import { refs } from '../common/refs';
import { STORAGE_HOME_KEY } from "../common/keys";  //ключ (попул.фильмов) для локального хранилища

let filmsArray = []
let page = 1;

export function renderFilm(films) {
                    // console.log('Тут разметка фильмов', films.data.results)
    filmsArray = films.data.results; //массив с обьектами, все фильмы
  
    const markup = filmsArray.map(film => {
        // ------------
        delete film.adult;
        delete film.video;
        // -----------

            if (film.name) {
        film.title = film.name;
            }
            if (film.original_name) {
        film.original_title = film.original_name;
            }

        //----дата выхода фильма
        const releseDateMovies = film.release_date;
        const releseData = (releseDateMovies.split("-"))[0];  //дата выхода по разделителю (и 0-му индексу масива)
        // const releseData = releseDateMovies.slice(0, 4);  //дата выхода(убирает слайсом два последних числа)

        //----это для модалки популярность
        const ratingMovie = Number(film.popularity).toFixed(1);
        
        // ----рендерим жанры
                     // console.log('Все жанры 1-го фильма (номера):', film.genre_ids)
        const genresArray = film.genre_ids.reduce((acc, id) => {
            let genreToFind = genres.find(genre => genre.id === id); //genre - {id, name}
                     // console.log(genreToFind); //genres - [{id,name},{id,name},...]; genreToFind - {id,name}
      if (genreToFind) {
          acc.push(genreToFind.name);
                     //  console.log('1жанр:', genreToFind.name)
            }
            
      return acc;
    }, []);
                    // console.log('Все жанры фльма(словами)', genresArray)

        //----больше трех жанров - Other
        if (genresArray.length > 3) {
            genresArray.splice(3);
            genresArray[2] = 'Other';
        } else if (genresArray.length === 0) {
            genresArray[0] = 'Genre Unknown';
        }
        if (!film.poster_path) {
            film.poster_path = '../../images/poster-not-find.jpg'
        }
                                                                // https://image.tmdb.org/t/p/original/{{poster_path}}
        return `
        <li class="gallery-item list">
            <a class="link" href="#">
                <div class="photo-card">
                    <img class="photo-img" src="${`https://image.tmdb.org/t/p/original/${film.poster_path}`}" alt="Постер ${film.title}"  />
                </div>    
                <div class="info">
                        <p class=movie-title> ${film.title}</p>
                        <p class=movie-text-data> Жанр: ${genresArray} | ${releseData} <span class='raiting-movie'>${film.vote_average}</span></p>
                </div>
                
            </a>
        </li>
        `}).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    // массив популярных фильмов в/c LocalStorage
    localStorage.setItem(STORAGE_HOME_KEY, JSON.stringify(filmsArray));
    const theme = localStorage.getItem(STORAGE_HOME_KEY);
    console.log('нашла??:',  JSON.parse(theme))
}


// получение данных с LocalStorage
// const theme = localStorage.getItem(STORAGE_HOME_KEY)
// console.log('с локала стороджа', JSON.parse(theme))