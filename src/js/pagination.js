import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';


export default function paginationAPI(num) {
  const sources = function () {
    let result = [];

    for (var i = 1; i <num; i++) {
      result.push(i);
    }

    return result;
  };
  const options = {
    dataSource: sources(),
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
    $('.paginationjs-pages ul').addClass('pagination-container list');;
    $('.paginationjs-pages li').addClass("pagination-button");
    if (API.searchQuery === '') {
      renderTrending();
    } else {
      renderSearch();
    }
  },
  }
  // console.log(sources())
  $('.pagination-container').pagination(options);
}




// if (API.searchQuery === '') {
//     $('.pagination-container').pagination({
//       dataSource: `${API.stringUrl}`,
//       locator: 'result',
//       totalNumberLocator: function (response) {
//          let result = [];
//     for (let i = 1; i < response.total_pages; i++) {
//         result.push(i);
//         }

//         return result;
//       },
//       pageSize: 1,
// 			showPageNumbers: true,
// 			showPrevious: true,
// 			showNext: true,
//       autoHidePrevious: true,
//       autoHideNext: true,
// 			showFirstOnEllipsisShow: true,
// 			showLastOnEllipsisShow: true,
//   callback: function (data, pagination) {
//     API.pages = Number(data);
//     $('.paginationjs-pages ul').addClass('pagination-container list');;
//     $('.paginationjs-pages li').addClass("pagination-button");
//     if (API.searchQuery === '') {
//       renderTrending();
//     } else {
//       renderSearch();
//     }
//   },
// })
//   }