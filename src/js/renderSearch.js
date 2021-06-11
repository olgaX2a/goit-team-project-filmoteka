import cardFilm from '../templates/card';

import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';

const cardList = document.querySelector('.card__list');
const searchRef = document.getElementById('search');

searchRef.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();
  APi.searchQuery = event.target.query.value.trim();
  // if (!APi.searchQuery.query) {
  //     return
  // }
  // else {
  //       APi.resetPage();
  // renderSearch()
  // }
  APi.resetPage();
  renderSearch();
}
async function renderSearch() {
  const trends = await APi.searchMovie().then(data => {
    return data.results;
  });
  const genres = await APi.getGenresList().then(list => {
    return list.genres;
  });
  const result = await createObj(trends, genres);
  // временный вывод в консоль для контроля
  console.log('result :>> ', result);
  cardList.innerHTML = cardFilm(result);
  APi.incrementPage();
}
