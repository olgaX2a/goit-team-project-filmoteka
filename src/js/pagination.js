import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';
import { smoothScrool } from './customPg.js';
import { data } from 'jquery';

function paginationAPI(link) {
  const options = {
    dataSource: API.url,
    locator: function () {
     let pages = API.searchMovie().then(data => {
       return data.total_pages
      });
      console.log(pages)
    },
    // totalNumberLocator: function (response) {
    //   console.log(response)
    // },
     pageSize: 1,
			showPageNumbers: true,
			showPrevious: false,
			showNext: false,
      autoHidePrevious: true,
      autoHideNext: true,
			showFirstOnEllipsisShow: true,
    showLastOnEllipsisShow: true,
    callback: function (data, pagination) {
      renderPages(data);
    }
  }

  $('.paginationjs').pagination(options);
}

paginationAPI();





