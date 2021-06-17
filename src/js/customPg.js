import renderTrend from './renderTrendingFilms.js';
import renderSearch from './renderSearch.js';
import API from '../apiServises/apiService.js';
import {showSpinner, hideSpinner} from '../js/spiner';

const gallery = document.querySelector('.card__list');
const inputRef = document.querySelector('.search__input');
const btn1Ref = document.querySelector('[data-index="1"]');
const btn2Ref = document.querySelector('[data-index="2"]');
const btn3Ref = document.querySelector('[data-index="3"]');
const btn4Ref = document.querySelector('[data-index="4"]');
const btn5Ref = document.querySelector('[data-index="5"]');
const firstPageRef = document.querySelector('.first-button');
const lastPageRef = document.querySelector('.last-button');
const paginationRef = document.querySelector('.pagination-container');
const rightArrowRef = document.querySelector('.arrow-right');
const leftArrowRef = document.querySelector('.arrow-left');
const prevDotsRef = document.querySelector('#previous');
const afterDotsRef = document.querySelector('#after');


paginationRef.addEventListener('click', () => {
  showSpinner();
  onPaginationClick();
});

let currentPage = 1;

let btns = document.querySelectorAll('.pagination-button');

prevDotsRef.hidden = true;
leftArrowRef.hidden = true;
firstPageRef.hidden = true;

function onPaginationClick(event) {
  showSpinner();
  if (event.target.tagName === 'BUTTON') {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    prevDotsRef.hidden = true;
    afterDotsRef.hidden = true;

    if (event.target.classList.contains('pagination-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      event.target.classList.add('pagination--current');
    }

    if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.classList.add('pagination--current');
      btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
      currentPage = btn1Ref.textContent;
    }

    if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
      btn5Ref.classList.add('pagination--current');
      currentPage = btn5Ref.textContent;
    }

    if (event.target.classList.contains('first-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = 1;
      btn2Ref.textContent = 2;
      btn3Ref.textContent = 3;
      btn4Ref.textContent = 4;
      btn5Ref.textContent = 5;
      btn1Ref.classList.add('pagination--current');
      currentPage = btn1Ref.textContent;
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (event.target.classList.contains('last-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = Number(lastPageRef.textContent) - 4;
      btn2Ref.textContent = Number(lastPageRef.textContent) - 3;
      btn3Ref.textContent = Number(lastPageRef.textContent) - 2;
      btn4Ref.textContent = Number(lastPageRef.textContent) - 1;
      btn5Ref.textContent = lastPageRef.textContent;
      btn5Ref.classList.add('pagination--current');
      currentPage = btn5Ref.textContent;
      rightArrowRef.hidden = true;
      afterDotsRef.hidden = true;
      lastPageRef.hidden = true;
    }

    if (Number(currentPage) > 5) {
      leftArrowRef.hidden = false;
      prevDotsRef.hidden = false;
      firstPageRef.hidden = false;
    } else {
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (Number(currentPage) < 996) {
      rightArrowRef.hidden = false;
      afterDotsRef.hidden = false;
      lastPageRef.hidden = false;
    }

    smoothScrool()
    showSpinner()
    if (inputRef.value !== '') {
      API.pages = currentPage;
      renderSearch();
      hideSpinner()
    } else {
      API.pages = currentPage;
      renderTrend();
      hideSpinner()
    }
  }
}


//////////// version 2
const containerRef = document.querySelector('.pagination-container2');
const arrowLeftEl = document.querySelector('.arrow-left2');
const arrowRightEl = document.querySelector('.arrow-right2');

containerRef.addEventListener('click', onArrowClick);

arrowLeftEl.hidden = true;

function onArrowClick(e) {
  showSpinner()
  if (e.target.classList.contains('arrow-left2')) {
     if (API.pages === 1) {
       arrowLeftEl.hidden = true;
       return
  }
    smoothScrool();
  if (inputRef.value !== '') {
      API.pages -= 1;
    renderSearch();
    } else {
      API.pages -=1;
    renderTrend();
    }
    hideSpinner()
  } else if (e.target.classList.contains('arrow-right2')) {
    arrowLeftEl.hidden = false;
    smoothScrool();
    if (inputRef.value !== '') {
      API.pages += 1;
      renderSearch();
    } else {
      API.pages +=1;
      renderTrend();
    }
    hideSpinner()
  }

}

export const smoothScrool = function() {
   gallery.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}