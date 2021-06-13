import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';




$('#pagination-container').pagination({
  dataSource: function (done) {
    var result = [];
    for (var i = 1; i <= 1000; i++) {
        result.push(i);
    };
    done(result);
 },
  totalNumber: 1000,
      pageSize: 1,
			showPageNumbers: true,
			showPrevious: true,
			showNext: true,
  autoHidePrevious: true,
      autoHideNext: true,
			showFirstOnEllipsisShow: true,
			showLastOnEllipsisShow: true,
  callback: function (data, pagination) {
    API.pages = Number(data);
    $('.paginationjs-pages ul').addClass('pagination-container');;
    $('.paginationjs-pages li').addClass("pagination-button");
    // renderTrending();
    renderSearch();
    },
})



