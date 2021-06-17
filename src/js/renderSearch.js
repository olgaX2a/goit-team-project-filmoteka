import cardFilm from '../templates/card';
import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import { showSpinner, hideSpinner } from '../js/spiner';
import { openModal } from './renderMovieInfo';
import paginationAPI from './pagination';
import refs from './refs';

refs.search.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();
  clearCardsMarkup();

  APi.searchQuery = event.target.query.value.trim();
  // console.log('APi.searchQuery :>> ', !APi.searchQuery);
  if (!APi.searchQuery) {
    // временный вывод в консоль, необходимо выкидывать ошибку в разметку
    console.log('Nothing to search');
    renderEmptySearch();
    return;
  } else {
    hideEmptySearch();
    showSpinner();
    APi.resetPage();
    renderSearch();
  }
}

export default async function renderSearch() {
  try {
    const trends = await APi.searchMovie().then(data => {
      console.dir(APi.searchMovie);
      APi.totalPages = Number(data.total_pages);
      return data.results;
    });
    const genres = await APi.getGenresList().then(list => {
      return list.genres;
    });
    const result = await createObj(trends, genres);
    // временный вывод в консоль для контроля
    // console.log('result :>> ', result);
    if (result.length > 0) {
      refs.cardList.innerHTML = cardFilm(result);
      result;
    } else {
      renderEmptySearch();
      return;
    }
  } catch (error) {
    console.log('error :>> ', error);
  } finally {
    hideSpinner();
  }
}
function clearCardsMarkup() {
  refs.cardList.innerHTML = '';
}

export function renderEmptySearch() {
  refs.emptySearch.classList.remove('hidden');
}
export function hideEmptySearch() {
  refs.emptySearch.classList.add('hidden');
}
