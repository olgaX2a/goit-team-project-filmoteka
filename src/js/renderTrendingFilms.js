import cardFilm from '../templates/card';

import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import {showSpinner, hideSpinner} from '../js/spiner';
import { openModal } from './renderMovieInfo';

const searchRef = document.getElementById('search');

const cardList = document.querySelector('.card__list');

// отрисовка популярных фильмов при загрузке страницы;
document.addEventListener('DOMContentLoaded', renderTrending);

// отрисовка популярных фильмов при нажатии на логотип;
const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', () => {
  clearQuery();
  showSpinner();
  APi.resetPage();
  renderTrending();
});

// отрисовка популярных фильмов при нажатии на кнопу HOME;
const homeLink = document.querySelector('.link__home');
homeLink.addEventListener('click', () => {
  clearQuery();
  showSpinner();
  APi.resetPage();
  renderTrending();
});

async function renderTrending() {
  try {
    const trends = await APi.fetchTrending().then(data => {
      return data.results;
    });
    const genres = await APi.getGenresList().then(list => {
      return list.genres;
    });
    const result = await createObj(trends, genres);

    // временный вывод в консоль для контроля
    console.log('result :>> ', result);
    cardList.innerHTML = cardFilm(result);
    Array.from(cardList.children).forEach(element => {
      element.addEventListener('click', openModal)
    })
  } catch (error) {
    console.log('error :>> ', error);
  }
  finally {
    hideSpinner();
  }
}

function clearQuery() {
  searchRef.query.value = ""
}
