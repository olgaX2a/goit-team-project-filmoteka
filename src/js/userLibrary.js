import { watchedTest, queueTest, filmToCheckOne, filmToCheckTwo } from './testFilms';
import cardFilm from '../templates/card';

// start refs
const cardListLib = document.querySelector('.card__list');
const myLibraryLink = document.querySelector('.link__library');
const libWatched = document.querySelector('.js-lib-watched');
const libQueue = document.querySelector('.js-lib-queue');
// ens refs

// start eventListeners
libWatched.addEventListener('click', () => {
  clearContent(cardListLib);
  const result = getWatchedFromLocal();
  renderCardList(result);
});

libQueue.addEventListener('click', () => {
  clearContent(cardListLib);
  const result = getQueueFromLocal();
  renderCardList(result);
});

myLibraryLink.addEventListener('click', () => {
  clearContent(cardListLib);
  const fullLibrary = getFullLibraryFromLocal();
  renderCardList(fullLibrary);
});
// end eventListeners

// start functions
function getFullLibraryFromLocal() {
  const watchedArray = getWatchedFromLocal();
  const queueArray = getQueueFromLocal();
  return watchedArray.concat(queueArray);
}

function addFilmToWatched(film) {
  const userWatched = getWatchedFromLocal() ? getWatchedFromLocal() : [];
  console.log('userWatched :>> ', userWatched);
  userWatched.push(film);
  setWatchedToLocal(userWatched);
}

function addFilmToQueue(film) {
  const userQueue = getQueueFromLocal() ? getQueueFromLocal() : [];
  userQueue.push(film);
  setQueueToLocal(userQueue);
}

function clearContent(element) {
  element.innerHTML = '';
}

function renderCardList(result) {
  cardListLib.innerHTML = cardFilm(result);
}

function getWatchedFromLocal() {
  return JSON.parse(localStorage.getItem('watched'));
}

function getQueueFromLocal() {
  return JSON.parse(localStorage.getItem('queue'));
}

function setWatchedToLocal(objToSet) {
  localStorage.setItem('watched', JSON.stringify(objToSet));
}

function setQueueToLocal(objToSet) {
  localStorage.setItem('queue', JSON.stringify(objToSet));
}

function isInWatched(film) {
  const watchedList = getWatchedFromLocal();
  const res = watchedList.find(el => el.id === film.id);
  return res ? true : false;
}
function isInQueue(film) {
  const queueList = getQueueFromLocal();
  const res = queueList.find(el => el.id === film.id);
  return res ? true : false;
}

function renderRemoveFromWatched(btn) {
  btn.innerHTML = 'Remove from watched';
}
function renderRemoveFromQueue(btn) {
  btn.innerHTML = 'Remove from queue';
}
function renderAddToWatched(btn) {
  btn.innerHTML = 'Add to watched';
}
function renderAddToQueue(btn) {
  btn.innerHTML = 'Add to queue';
}

function removeFilmFromWatched(film) {
  const list = getWatchedFromLocal();
  const indexToRemove = list.map(obj => obj.id).indexOf(film.id);
  list.splice(indexToRemove, 1);
  setWatchedToLocal(list);
}
function removeFilmFromQueue(film) {
  const list = getQueueFromLocal();
  const indexToRemove = list.map(obj => obj.id).indexOf(film.id);
  list.splice(indexToRemove, 1);
  setQueueToLocal(list);
}

// end functions

// tests
// addFilmToQueue(filmToCheckOne);
// console.log('object 1:>> ', isInQueue(filmToCheckTwo));
// removeFilmFromQueue(filmToCheckOne);
// addFilmToQueue(film)
// console.log('object 2:>> ', isInQueue(filmToCheckTwo));
