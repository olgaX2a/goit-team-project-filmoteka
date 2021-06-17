import modalFilmCard from '../templates/modalFilmCard.hbs';
import modalPoster from '../templates/modalPoster.hbs';
import modalText from '../templates/modalText.hbs';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
import APi from '../apiServises/apiService';
import * as lib from './userLibrary';
import refs from './refs';
import { createInfoObj } from '../apiServises/normalizeResults';

async function getFullMovieInfoById(id) {
  try {
    const initialData = await APi.getMovieInfoById(id);
    const fullInfo = createInfoObj(initialData);
    return { ...fullInfo };
  } catch (error) {
    console.log('error in getFullMovieInfoById(id) :>> ', error);
  }
}

refs.cardList.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

let targetFilm;
export async function openModal(event) {
  event.preventDefault();
  const targetID = event.target.closest('LI').id;
  targetFilm = await getFullMovieInfoById(targetID);
  clearModal();
  lib.getCorrectButtons(targetID);
  refs.modalPoster.innerHTML = modalPoster(targetFilm);
  refs.modalText.innerHTML = modalText(targetFilm);
  showModal();
}

function showModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', closeModalByEscape);
}
function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', closeModalByEscape);
}

function clearModal() {
  refs.modalPoster.innerHTML = '';
  refs.modalText.innerHTML = '';
}
function closeModalByEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
  return;
}

function onWatchedBtnClick() {
  const action = lib.checkWatchedDataAction();
  if (action === 'add') {
    lib.addFilmToWatched(targetFilm);
    lib.renderRemoveFromWatched();
    return;
  }
  if (action === 'remove') {
    lib.removeFilmFromWatched(targetFilm);
    lib.renderAddToWatched();
    return;
  }
}

function onQueueBtnClick() {
  const action = lib.checkQueueDataAction();
  if (action === 'add') {
    lib.addFilmToQueue(targetFilm);
    lib.renderRemoveFromQueue();
    return;
  }
  if (action === 'remove') {
    lib.removeFilmFromQueue(targetFilm);
    lib.renderAddToQueue();
    return;
  }
}
