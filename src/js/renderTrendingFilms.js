import cardFilm from '../templates/card';

import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import loading from '../js/spiner';

const cardList = document.querySelector('.card__list');
const spinerContainer = document.getElementById('spiner');
// spinerContainer.classList.add('is-hidden');

// отрисовка популярных фильмов при загрузке страницы;
document.addEventListener('DOMContentLoaded', renderTrending);
// отрисовка популярных фильмов при нажатии на логотип;
const logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', () => {
  APi.resetPage();
  renderTrending();
});
// отрисовка популярных фильмов при нажатии на кнопу HOME;
const homeLink = document.querySelector('.link__home');
homeLink.addEventListener('click', () => {
  APi.resetPage();
  renderTrending();
});

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
  cardList.innerHTML = cardFilm(result);
}
// временный вызов функции для тестирования работоспособности, в дальнейшем повесить на слушатель
// renderTrending();
