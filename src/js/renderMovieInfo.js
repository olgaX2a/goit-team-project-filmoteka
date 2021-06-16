import modalFilmCard from '../templates/modalFilmCard.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import APi from '../apiServises/apiService';
import * as lib from './userLibrary';
import refs from './refs';
import { createInfoObj } from '../apiServises/normalizeResults';

async function getFullMovieInfoById(id) {
  try {
    const info = await APi.getMovieInfoById(id).then(data => {
      return data;
    });
    const fullInfo = createInfoObj(info);
    return fullInfo;
  } catch (error) {
    console.log('error in getFullMovieInfoById(id) :>> ', error);
  }
}
refs.cardList.addEventListener('click', openModal);

let targetFilm;

export function openModal(e) {
  e.preventDefault();
  const targetID = e.target.closest('LI').id;
  console.log('targetID :>> ', targetID);

  getFullMovieInfoById(targetID).then(data => {
    data;
    const markup = modalFilmCard(data);
    console.log('markup :>> ', markup);
    const modal = basicLightbox.create(markup);
    console.log('modal :>> ', modal);

    modal.show();
    console.log('tf after show :>> ', data);
    // const watcheBtn = document.querySelector('.js-modal-watched');
    const watchedBtn = document.querySelector('.js-modal-watched');
    console.log('watchedBtn :>> ', watchedBtn);
    lib.getCorrectWatchedButtons(targetID, watchedBtn);
    watchedBtn.addEventListener('click', event => {
      if (event.target.nodeName !== 'button') {
        return;
      }
      lib.addFilmToWatched(data);
    });

    const queueBtn = document.querySelector('.js-modal-queue');
    console.log('queueBtn :>> ', queueBtn);
    lib.getCorrectQueueButtons(targetID, queueBtn);
    queueBtn.addEventListener('click', event => {
      if (event.target.nodeName !== 'button') {
        return;
      }
      lib.addFilmToQueue(data);
    });

    // console.log('closeBtn :>> ', closeBtn);
    const closeBtn = document.querySelector('.modal-close-btn');
    console.log('closeBtn :>> ', closeBtn);
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', closeModalHandler);

    function closeModalHandler(e) {
      if (e.code === 'Escape') {
        watchedBtn.removeEventListener('click', lib.addFilmToWatched(data));
        queueBtn.removeEventListener('click', lib.addFilmToQueue(data));
        console.log('event listener removed1');
        window.removeEventListener('keydown', closeModalHandler);
        modal.close();
      }
    }

    function closeModal(e) {
      console.log('closeModal invoked');
      watchedBtn.removeEventListener('click', lib.addFilmToWatched(data));
      console.log('event listenet removed watched');
      queueBtn.removeEventListener('click', lib.addFilmToQueue(data));
      console.log('event listenet removed queue');
      window.removeEventListener('keydown', closeModalHandler);
      console.log('event listenet removed window -handler');
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
