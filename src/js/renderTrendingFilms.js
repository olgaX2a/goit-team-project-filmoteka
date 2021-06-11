import cardFilm from '../templates/card';

import APi from '../apiServises/apiService';
import {createObj} from '../apiServises/normalizeResults'

const cardList = document.querySelector('.card__list');

async function renderTrending() {
    const trends = await APi.fetchTrending().then((data) => {
      return data.results;
    });
    const genres = await APi.getGenresList().then((list) => {
      return list.genres;
    });
    const result = await createObj(trends, genres);
  // временный вывод в консоль для контроля
    console.log("result :>> ", result);
    cardList.insertAdjacentHTML('beforeend', cardFilm(result))
}
// временный вызов функции для тестирования работоспособности, в дальнейшем повесить на слушатель
renderTrending();
