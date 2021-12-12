import './sass/main.scss';
import { genres } from './js/common/genres';  //жанры
import { fetchPopularMovies } from './js/api/api-popular';  //запрос за популярными фильмами
import { fetchSearchMovies } from './js/api/api-search-input';  //запрос фильмов по поиску
import { STORAGE_HOME_KEY } from "./js/common/keys";  //ключ (попул.фильмов) для локального хранилища
import { refs } from './js/common/refs';
import { onSerchButtonLoadMore } from './js/helpers/button-load-more';  //кнопка догрузить еще
import { upArrow } from './js/helpers/back-to-top';  //кнопка прокрутка вверх
import { Notify } from 'notiflix/build/notiflix-notify-aio'; //вывод уведомлений
import { settingNotify } from './js/common/settings-for-notiflix'; //настройка уведомлений

let filmsArray = []
// Запрос за популярными фильмами
fetchPopularMovies().then(film => renderFilm(film));
 


// работаем с инпутом (поиск фильмов по ключ.слову)
        let textInput = '';
    refs.searchForm.addEventListener('submit', onSearchInput);
    


function onSearchInput(event) {
     event.preventDefault();
     refs.gallery.innerHTML = '';
     textInput = event.currentTarget.elements.searchQuery.value;

   
      // alert('ВВедите название фильма');
    if (textInput === '') {
        Notify.failure('Please enter a movie name', settingNotify);
        
        // ??? вытянуть с локал стордж, что бы не было доп запроса
        fetchPopularMovies().then(film => renderFilm(film));
    } else if (filmsArray.length === 0) {
        // ???!!! нужно что-то обнулить так что бы изначально массив =0, а то сразу уже 20
        Notify.warning('Nothing found. Please try again.', settingNotify);
        refs.searchForm.value = '';
    } else {
    // запрос фильма по поиску через название (инпут)
    fetchSearchMovies(textInput).then(film => renderFilm(film)); 
    }
console.log('массив???????? - ', filmsArray.length)
}




function renderFilm(films) {
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