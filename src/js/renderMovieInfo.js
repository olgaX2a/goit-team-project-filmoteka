import modalFilmCard from '../templates/modalFilmCard.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import APi from '../apiServises/apiService';
import * as lib from './userLibrary';
import refs from './refs';

const apiKey = 'a6a422d110dec9c7fa9eeee757b6f274';

refs.cardList.addEventListener('click', openModal);

function getMovieInfoById(movie_id) {
  // console.log(movie_id)
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity_rate: data.popularity.toFixed(1),
    }))
    .catch(error => console.log(error));
}

export function openModal(e) {
  e.preventDefault();
  const targetID = e.target.parentNode.parentNode.parentNode.id;

  getMovieInfoById(targetID).then(data => {
    // if (e.target.nodeName !== 'IMG') return;
    console.log('data :>> ', data);

    const markup = modalFilmCard(data);
    console.log('markup :>> ', markup);
    const modal = basicLightbox.create(markup);
    console.log('modal :>> ', modal);

    modal.show();
    console.log('data after show :>> ', data);
    // const watcheBtn = document.querySelector('.js-modal-watched');
    const queueBtn = document.querySelector('.js-modal-queue');
    console.log('queueBtn :>> ', queueBtn);
    lib.getCorrectQueueButtons(targetID, queueBtn);

    queueBtn.addEventListener('click', lib.addFilmToQueue(data));
    // console.log('closeBtn :>> ', closeBtn);
    const closeBtn = document.querySelector('.modal-close-btn');
    console.log('closeBtn :>> ', closeBtn);
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', closeModalHandler);

    function closeModalHandler(e) {
      if (e.code === 'Escape') {
        queueBtn.removeEventListener('click', lib.addFilmToQueue(data));
        console.log('event listener removed1');
        window.removeEventListener('keydown', closeModalHandler);
        modal.close();
      }
    }

    function closeModal(e) {
      console.log('click :>> ', 'click');
      queueBtn.removeEventListener('click', lib.addFilmToQueue(data));
      console.log('event listener removed 2');
      window.removeEventListener('keydown', closeModalHandler);
      modal.close();
    }
  });
}

// async function renderFullInfo(id) {
//   try {
//     const info = await APi.getMovieInfoById().then((data) => ({
//       ...data,
//       popularity_rate: data.popularity.toFixed(1),
//       genres_full: genres.map(el => el.name).join(', ')
//     }))
//   ;
//     // временный вывод в консоль для контроля
//     console.log('info :>> ', info);
//     const markup = modalFilmCard(info);
//     const modal = basicLightbox.create(markup);
//     // Array.from(cardList.children).forEach(element => {
//     //   element.addEventListener('click', openModal)
//     // })
//   } catch (error) {
//     console.log('error :>> ', error);
//   } finally {
//     hideSpinner();
//   }
// }
