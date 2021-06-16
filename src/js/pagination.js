import API from '../apiServises/apiService.js';
// import paginationjs from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';
import { smoothScrool } from './customPg.js';
import { data } from 'jquery';

// tui-pagination
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  gallery: document.getElementById('gallery'),
  paginationContainer: document.getElementById('pagination')
}

function moveOnPage(totalPages) {
  const options = {
    totalItems: totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

 new Pagination('pagination', options);
}

function paginateOnClick(totalPages) {
  refs.paginationContainer.addEventListener('click', clickOnButton);

  function clickOnButton(e) {
    console.log('good')
    if (e.target.nodeName !== 'A') {
      return;
    }
  }
}

paginateOnClick(1)
// const container = document.getElementById('pagination');
// const options = {
//   totalItems: 1000,
//   itemsPerPage: 1,
//   visiblePages: 5,
//   page: 1,
//   centerAlign: true,
// };
// export const pagination = new Pagination(container,options);

// pagination.on('afterMove', function(evt) {
//      var currentPage = evt.page;
//   console.log(currentPage);
// });


// function paginationAPI(link) {
//   const options = {
//     dataSource: corectRende(),
//     locator: 'total_pages',
//     totalNumberLocator: function (response) {
//       let num = response.total_pages;
//       let item = [];
//       for (let i = 1; i <= num; i += 1){
//         item.push(i);
//       }
//       response.total_pages = item;
//       console.log(response)
//     },
//      pageSize: 1,
// 			showPageNumbers: true,
// 			showPrevious: false,
// 			showNext: false,
//       autoHidePrevious: true,
//       autoHideNext: true,
// 			showFirstOnEllipsisShow: true,
//     showLastOnEllipsisShow: true,
//     callback: function (data, pagination) {
//       // console.log(data);
//     }
//   }

//   $('.paginationjs').pagination(options);
// }

// paginationAPI();



// function corectRende() {
//   if (API.searchQuery === '') {
//     return API.url;
//   } else {
//     return API.url;
//   }
// }
