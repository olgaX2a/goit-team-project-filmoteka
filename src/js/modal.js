import modalGetCardFilm from '../templates/modalGetCardFilm';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// const modal = document.getElementById('my_modal');
// const btn = document.getElementById('btn_modal_window');
// const span = document.getElementsByClassName('close_modal_window')[0];

// btn.addEventListener('click', event => {
//   modal.style.display = 'block';
//   // const element = event.target.value;
//   fetchFilms(157336);
// });

// span.addEventListener('click', event => {
//   modal.style.display = 'none';
// });

// window.addEventListener('click', event => {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// });

// function myOpenModal(event) {
//   const modal = document.getElementById('my_modal');
//   modal.style.display = 'block';
// }

// function closeOpenModal(event) {
//   const span = document.getElementsByClassName('close_modal_window')[0];
//     if (event.target == modal) {
//       modal.style.display = 'none';
//     }
// }

// addEventListeners(data) {
//   document.querySelectorAll('.modal__card__modal__list_rigth').forEach(item => item.addEventListener('click,' event => {
//     openModal(event);
//   }))
// }

const cardItemFilm = document.querySelector('.card__list');

cardItemFilm.addEventListener('click', openModal);

function openModal(event) {
  // myOpenModal();
  event.preventDefault();
  fetchFilms(event.target.dataset.id).then(data => {
    if (!'IMG') {
      return
    };
  });

  const markupFilm = modalGetCardFilm(data);
  // getFilm.insertAdjacentHTML('beforeend', markupFilm);
  const createModal = basicLightbox.create(markupFilm);
  createModal.show();
}

function fetchFilms() {
  return fetch(`https://api.themoviedb.org/3/movie/157336?api_key=a6a422d110dec9c7fa9eeee757b6f274`)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toPrecision(4),
    }));
}