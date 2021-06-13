import cardFilm from '../templates/card';
import pagination from 'paginationjs/dist/pagination.min.js';
import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import {showSpinner, hideSpinner} from '../js/spiner';

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
    // console.log('result :>> ', result);
    cardList.innerHTML = cardFilm(result);
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

// временный вызов функции для тестирования работоспособности, в дальнейшем повесить на слушатель
// renderTrending();
