import { refs } from '../common/refs.js';
import { fetchPopularMovies } from '../api/api-popular';
import { renderFilm} from '../main-page'

let page = 1;

refs.buttonLoadMore.addEventListener('click', onLoadMore);

export function onLoadMore() {
     page += 1;
    console.log('клик на дозагрузку')

 fetchPopularMovies(page).then(film => renderFilm(film));
 
      //  ДОБАВИТЬ ПЕРЕХОД НА СЛЕД СТР. ПРИ ПОИСКЕ
}
