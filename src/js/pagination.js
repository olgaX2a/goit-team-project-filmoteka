import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';




$('#pagination-container').pagination({
  dataSource: function (done) {
    let result = [];
    let  totalPages = checkValue();

    for (var i = 1; i <= totalPages; i++) {
        result.push(i);
    };
    // console.log(result)
    done(result);
 },
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
    if (API.searchQuery === '') {
      // console.log("renderTrending> " + data);
      // console.log(API.totalPage);
      renderTrending();
    } else {
      // console.log(API.totalPage);
      // console.log("renderSearch> " + data);
      renderSearch();
    }

    },
})



function checkValue() {
  return API.totalPage;
}

console.log(checkValue());