import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';
import {API_KEY} from '../apiServises/apiService.js';
import {BASE_URL} from '../apiServises/apiService.js';




$('#pagination-container').pagination({
  dataSource: `${API.stringUrl}`,

  //     pageSize: 1,
	// 		showPageNumbers: true,
	// 		showPrevious: true,
	// 		showNext: true,
  //     autoHidePrevious: true,
  //     autoHideNext: true,
	// 		showFirstOnEllipsisShow: true,
	// 		showLastOnEllipsisShow: true,
  // callback: function (data, pagination) {
  //   API.pages = Number(data);
  //   $('.paginationjs-pages ul').addClass('pagination-container list');;
  //   $('.paginationjs-pages li').addClass("pagination-button");
  //   if (API.searchQuery === '') {
  //     renderTrending();
  //   } else {
  //     renderSearch();
  //   }
  // },
})
// function paginationSearch() {
//   $('#pagination-container').pagination({
//     dataSource: ''
//   })
// }
//  `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${API.pages}&language=${API.language}`,
//   locator: 'totalNumber',
//     totalNumberLocator: function(response) {
//       let N = Number(response.total_pages);
//         return Array.apply(null, {length: N}).map(Number.call, Number);
//     }