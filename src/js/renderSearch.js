import cardFilm from '../templates/card';
import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import { showSpinner, hideSpinner } from '../js/spiner';


const cardList = document.querySelector('.card__list');
const searchRef = document.getElementById('search');

searchRef.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();
  clearCardsMarkup();

  APi.searchQuery = event.target.query.value.trim();
  // console.log('APi.searchQuery :>> ', !APi.searchQuery);
  if (!APi.searchQuery) {
    // временный вывод в консоль, необходимо выкидывать ошибку в разметку
      console.log('Nothing to search');
      return
  }
  else {
    showSpinner();
    APi.resetPage();
    renderSearch()
  }
}



export default async function renderSearch() {
  try {
    const trends = await APi.searchMovie().then(data => {
      console.dir(APi.searchMovie)
      APi.totalPages = Number(data.total_pages);
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
  } finally {
    hideSpinner();
  }
}

function clearCardsMarkup() {
  cardList.innerHTML = "";
}

// function paginationSearch() {
//   $('#pagination-container').pagination({
//     dataSource: ``
//   })
// }