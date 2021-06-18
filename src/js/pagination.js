import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';
import { showSpinner, hideSpinner} from './spiner.js';
import Pagination from 'tui-pagination';
import API from '../apiServises/apiService.js';

const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const smoothScrool = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pagination = new Pagination('pagination', options);

function chooseRender(currentPage) {
  API.setPage(currentPage);
  if (API.searchQuery === '') {
    renderTrending()
    hideSpinner()
  } else {
    renderSearch()
    hideSpinner()
  }
};

pagination.on('afterMove', function (evt) {
  showSpinner();
  smoothScrool();
     let currentPage = evt.page;
  chooseRender(currentPage);
});

export {pagination};