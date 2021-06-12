import cardFilm from '../templates/card';

import APi from '../apiServises/apiService';
import {createObj} from '../apiServises/normalizeResults';
import loading from '../js/spiner';

const cardList = document.querySelector('.card__list');
const spinerContainer = document.getElementById('spiner');
// spinerContainer.classList.add('is-hidden');

async function renderTrending() {
  const trends = await APi.fetchTrending().then(data => {
    return data.results;
  });
  const genres = await APi.getGenresList().then(list => {
    return list.genres;
  });

  spinerContainer.classList.add('is-hidden');
  const result = await createObj(trends, genres);

  // временный вывод в консоль для контроля
  console.log('result :>> ', result);
  cardList.insertAdjacentHTML('beforeend', cardFilm(result));
}
// временный вызов функции для тестирования работоспособности, в дальнейшем повесить на слушатель
renderTrending();


