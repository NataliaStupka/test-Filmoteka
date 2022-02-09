import { Notify } from 'notiflix/build/notiflix-notify-aio'; //вывод уведомлений

// --------------------------
import { genres } from './common/genres';  //жанры &
import { fetchPopularMovies } from './api/api-popular';  //запрос за популярными фильмами

import { fetchSearchMovies } from './api/api-search-input';  //запрос фильмов по поиску
import { STORAGE_HOME_KEY } from "./common/keys";  //ключ (попул.фильмов) для локального хранилища
import { refs } from './common/refs'; // &
import { settingNotify } from './common/settings-for-notiflix'; //настройка уведомлений
// ------------------------
import { renderFilm } from './helpers/render-film';

let filmsArray = []
let page = 1;

// Запрос за популярными фильмами
fetchPopularMovies(page).then(film => renderFilm(film)).catch(error => console.log('Это ошибочка; ', error));
//------  ???ПОПРОБОВАТЬ ЧЕРЕЗ try catch


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
        fetchPopularMovies(page).then(film => renderFilm(film));
        
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













