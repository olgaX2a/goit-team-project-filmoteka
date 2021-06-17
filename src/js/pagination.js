// import paginationjs from 'paginationjs/dist/pagination.min.js';
import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';
// import { smoothScrool } from './customPg.js';
import { showSpinner, hideSpinner} from './spiner.js';
// tui-pagination
import Pagination from 'tui-pagination';
import API from '../apiServises/apiService.js';


// const searchRef2 = document.querySelector('.search__input');

// searchRef2.addEventListener('blur', onFocus);


// function onFocus(e) {
//   console.log(API.searchQuery === e.target.value);
//   if (API.searchQuery === e.target.value) {
//     pagination.movePageTo(1)
//     return
//   }
//   console.dir('log after')
//   // pagination.movePageTo(1)
// }
function refsForPagination() {
   const refs = {
  gallery: document.getElementById('gallery'),
  paginationContainer: document.getElementById('pagination')
  };
  return refs
}

//  function moveOnPage(totalPages) {
//   const options = {
//     totalItems: totalPages,
//     itemsPerPage: 1,
//     visiblePages: 5,
//     page: 1,
//     centerAlign: false,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     template: {
//       page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//       currentPage:
//         '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//       moveButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</a>',
//       disabledMoveButton:
//         '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</span>',
//       moreButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//         '<span class="tui-ico-ellip">...</span>' +
//         '</a>',
//     },
//    };
// new Pagination('pagination', options);
// };

// function paginateOnClick(totalPages) {
//   refsForPagination().paginationContainer.addEventListener('click', clickOnButton);

//   function clickOnButton(e) {
//     if (e.target.nodeName !== 'A') {
//       return;
//     }

//     refsForPagination().gallery.innerHTML = '';

//     showSpinner();

//     const btn = e.target;
//     console.log(btn)
//     switch (btn.className) {
//       case 'tui-page-btn':
//         API.setPage(Number(btn.textContent));
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-prev':
//         API.decrementPage();
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-next':
//         API.incrementPage();
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-first':
//         API.resetPage();
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-last':
//         API.setPage(totalPages);
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-first-child':
//         API.resetPage()
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-prev-is-ellip tui-first-child':
//         const currentBtnEllip = document.querySelector('.tui-is-selected');
//         API.setPage(Number(currentBtnEllip.textContent));
//         chooseRender();
//         return;

//       case 'tui-page-btn tui-next-is-ellip tui-last-child':
//         const currentBtnEllip2 = document.querySelector('.tui-is-selected');
//         API.setPage(Number(currentBtnEllip2.textContent));
//         chooseRender();
//         return;

//       default:
//         console.log('!');
//     }
//   }
// }



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


const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

export const pagination = new Pagination('pagination', options);

// pagination.on('beforeMove', function (evt) {
//   console.log(API.searchQuery)
//   console.log(evt)
// })

pagination.on('afterMove', function (evt) {
     let currentPage = evt.page;
  chooseRender(currentPage);
});

