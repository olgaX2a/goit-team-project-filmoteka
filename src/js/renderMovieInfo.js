import modalFilmCard from '../templates/modalFilmCard.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


const apiKey = 'a6a422d110dec9c7fa9eeee757b6f274';

// const cardItems= document.querySelector('.card__item');
// cardItems.addEventListener('click', openModal);



function getMovieInfoById(movie_id) {
  console.log(movie_id)
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity_rate: data.popularity.toFixed(1),
    }))
    .catch((error) => console.log(error));
}


export const openModal = (e) => {
  e.preventDefault();
  getMovieInfoById(e.currentTarget.id)
    .then(data => {
      if (e.target.nodeName !== 'IMG') return;

      const markup = modalFilmCard(data);
      const modal = basicLightbox.create(markup);

      modal.show();

      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', closeModal);

      window.addEventListener('keydown', closeModalHandler);

      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
        }
      }

      function closeModal(e) {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
      }

    })
}