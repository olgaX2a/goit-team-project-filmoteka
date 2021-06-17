import cardFilm from '../templates/card';
import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import { showSpinner, hideSpinner } from '../js/spiner';
import { openModal } from './renderMovieInfo';
import refs from './refs';
import { hideEmptyLib } from './userLibrary';
import { hideEmptySearch } from './renderSearch';

// const searchRef = document.getElementById('search');

// const cardList = document.querySelector('.card__list');

document.addEventListener('DOMContentLoaded', renderTrending);
refs.logoLink.addEventListener('click', renderHomePage);
refs.homeLink.addEventListener('click', renderHomePage);

function renderHomePage() {
  hideEmptySearch();
  hideEmptyLib();
  clearQuery();
  showSpinner();
  APi.resetPage();
  renderTrending();
}

export default async function renderTrending() {
  try {
    const trends = await APi.fetchTrending().then(data => {
      APi.totalPages = Number(data.total_pages);
      return data.results;
    });
    const genres = await APi.getGenresList().then(list => {
      return list.genres;
    });
    const result = await createObj(trends, genres);

    // временный вывод в консоль для контроля
    // console.log('result :>> ', result);
    refs.cardList.innerHTML = cardFilm(result);
    // Array.from(cardList.children).forEach(element => {
    //   element.addEventListener('click', openModal)
    // })
  } catch (error) {
    console.log('error :>> ', error);
  } finally {
    hideSpinner();
  }
}

function clearQuery() {
  refs.search.query.value = '';
}
