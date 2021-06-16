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
refs.closeModalBtn.addEventListener('click', closeModal);

let targetFilm;

export function openModal(event) {
  event.preventDefault();
  const targetID = event.target.closest('LI').id;
  console.log('targetID :>> ', targetID);
  getFullMovieInfoById(targetID).then(data => {
    data;
    clearModal();
    refs.modalInfoContainer.innerHTML = modalFilmCard(data);
    lib.getCorrectButtons(targetID);
    showModal();
    refs.watchedBtn.addEventListener('click', lib.onWatchedBtnClick(data));
    refs.queueBtn.addEventListener('click', lib.onQueueBtnClick(data));

    // console.log('markup :>> ', markup);
    // const modal = basicLightbox.create(markup);
    // console.log('modal :>> ', modal);

    // modal.show();

    // const watchedBtn = document.querySelector('.js-modal-watched');
    // lib.getCorrectWatchedButtons(targetID, watchedBtn);
    // watchedBtn.addEventListener('click', onWatchedClick);

    // function onWatchedClick(event) {
    //   if (event.target.nodeName !== 'button') {
    //     return;
    //   }
    //   lib.addFilmToWatched(data);
    // }
    // function onQueueClick(event) {
    //   if (event.target.nodeName !== 'button') {
    //     return;
    //   }
    //   lib.addFilmToQueue(data);
    // }

    // const queueBtn = document.querySelector('.js-modal-queue');
    // console.log('queueBtn :>> ', queueBtn);
    // lib.getCorrectQueueButtons(targetID, queueBtn);
    // queueBtn.addEventListener('click', onQueueClick);

    // const closeBtn = document.querySelector('.modal-close-btn');
    // console.log('closeBtn :>> ', closeBtn);
    // closeBtn.addEventListener('click', closeModal);

    // window.addEventListener('keydown', closeModalHandler);

    // function closeModalHandler(event) {
    //   if (event.code === 'Escape') {
    //     watchedBtn.removeEventListener('click', onWatchedClick);
    //     queueBtn.removeEventListener('click', onQueueClick);
    //     window.removeEventListener('keydown', closeModalHandler);
    //     refs.modalInfoContainer.classList.add('is-hidden');
    //   }
    // }

    // function closeModal() {
    //   watchedBtn.removeEventListener('click', onWatchedClick);
    //   queueBtn.removeEventListener('click', onQueueClick);
    //   window.removeEventListener('keydown', closeModalHandler);
    //   refs.modalInfoContainer.classList.add('is-hidden');
    // }
  });
}

function showModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', closeModalByEscape);
}
function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalByEscape);
  refs.watchedBtn.removeEventListener('click', lib.onWatchedBtnClick(data));
  refs.queueBtn.removeEventListener('click', lib.onQueueBtnClick(data));
}

function clearModal() {
  refs.modalInfoContainer.innerHTML = '';
}
// window.addEventListener('keydown', closeModalByEscape);
// window.removeEventListener('keydown', closeModalByEscape);
function closeModalByEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
  return;
}
