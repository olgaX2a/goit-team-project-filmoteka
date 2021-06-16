import { watchedTest, queueTest, filmToCheckOne, filmToCheckTwo } from './testFilms';
import cardFilm from '../templates/card';
import refs from './refs';

// start eventListeners
refs.libWatched.addEventListener('click', () => {
  clearContent(refs.cardList);
  const result = getWatchedFromLocal();
  renderCardList(result);
});

refs.libQueue.addEventListener('click', () => {
  clearContent(refs.cardList);
  const result = getQueueFromLocal();
  renderCardList(result);
});

refs.myLibraryLink.addEventListener('click', () => {
  clearContent(refs.cardList);
  const fullLibrary = getFullLibraryFromLocal();
  console.log('fullLibrary :>> ', fullLibrary);
  renderCardList(fullLibrary);
});
// end eventListeners

// start functions
export function getFullLibraryFromLocal() {
  const watchedArray = getWatchedFromLocal();
  const queueArray = getQueueFromLocal();
  return watchedArray.concat(queueArray);
}

export function addFilmToWatched(film) {
  const userWatched = getWatchedFromLocal();
  userWatched.push(film);
  setWatchedToLocal(userWatched);
}

export function addFilmToQueue(film) {
  const userQueue = getQueueFromLocal();
  userQueue.push(film);
  setQueueToLocal(userQueue);
}

export function clearContent(element) {
  element.innerHTML = '';
}

export function renderCardList(result) {
  refs.cardList.innerHTML = cardFilm(result);
}

export function getWatchedFromLocal() {
  if (JSON.parse(localStorage.getItem('watched'))) {
    return JSON.parse(localStorage.getItem('watched'));
  } else {
    return [];
  }
}

export function getQueueFromLocal() {
  if (JSON.parse(localStorage.getItem('queue'))) {
    return JSON.parse(localStorage.getItem('queue'));
  } else {
    return [];
  }
}

export function setWatchedToLocal(objToSet) {
  localStorage.setItem('watched', JSON.stringify(objToSet));
}

export function setQueueToLocal(objToSet) {
  localStorage.setItem('queue', JSON.stringify(objToSet));
}

export function isInWatched(filmId) {
  const watchedList = getWatchedFromLocal();
  const res = watchedList.find(el => el.id === filmId);
  return res ? true : false;
}
export function isInQueue(filmId) {
  const queueList = getQueueFromLocal();
  const res = queueList.find(el => el.id === filmId);
  return res ? true : false;
}

export function renderRemoveFromWatched(btn) {
  btn.innerHTML = 'Remove from watched';
}
export function renderRemoveFromQueue(btn) {
  btn.innerHTML = 'Remove from queue';
}
export function renderAddToWatched(btn) {
  btn.innerHTML = 'Add to watched';
}
export function renderAddToQueue(btn) {
  btn.innerHTML = 'Add to queue';
}

export function removeFilmFromWatched(film) {
  const list = getWatchedFromLocal();
  const indexToRemove = list.map(obj => obj.id).indexOf(film.id);
  list.splice(indexToRemove, 1);
  setWatchedToLocal(list);
}
export function removeFilmFromQueue(film) {
  const list = getQueueFromLocal();
  const indexToRemove = list.map(obj => obj.id).indexOf(film.id);
  list.splice(indexToRemove, 1);
  setQueueToLocal(list);
}

export function getCorrectWatchButtons(id, watcheBtn) {
  if (isInWatched(id)) {
    renderRemoveFromWatched(watcheBtn);
    return;
  } else {
    renderAddToWatched(watcheBtn);
    return;
  }
}

export function getCorrectQueueButtons(id, queueBtn) {
  if (isInQueue(id)) {
    renderRemoveFromQueue(queueBtn);
    return;
  } else {
    renderAddToQueue(queueBtn);
    return;
  }
}

// end functions

// tests
// addFilmToQueue(filmToCheckOne);
// console.log('object 1:>> ', isInQueue(filmToCheckTwo));
// removeFilmFromQueue(filmToCheckOne);
// addFilmToQueue(film)
// console.log('object 2:>> ', isInQueue(filmToCheckTwo));
