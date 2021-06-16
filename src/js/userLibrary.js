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

export function onWatchedBtnClick(film) {
  const action = checkWatchedDataAction();
  if (action === 'add') {
    addFilmToWatched(film);
    renderRemoveFromWatched();
    return;
  }
  if (action === 'remove') {
    removeFilmFromWatched(film);
    renderAddToWatched();
    return;
  }
}

export function onQueueBtnClick(film) {
  const action = checkQueueDataAction();
  if (action === 'add') {
    addFilmToQueue(film);
    renderRemoveFromQueue();
    return;
  }
  if (action === 'remove') {
    removeFilmFromQueue(film);
    renderAddToQueue();
    return;
  }
}

export function addFilmToWatched(film) {
  const userWatched = getWatchedFromLocal();
  userWatched.push(film);
  setWatchedToLocal(userWatched);
  refs.watchedBtn.setAttribute('data-action', 'remove');
}

export function addFilmToQueue(film) {
  const userQueue = getQueueFromLocal();
  userQueue.push(film);
  setQueueToLocal(userQueue);
}

export function removeFilmFromWatched(film) {
  const list = getWatchedFromLocal();
  const indexToRemove = list.map(obj => obj.id).indexOf(film.id);
  list.splice(indexToRemove, 1);
  setWatchedToLocal(list);
  refs.watchedBtn.setAttribute('data-action', 'add');
}
export function removeFilmFromQueue(film) {
  const list = getQueueFromLocal();
  const indexToRemove = list.map(obj => obj.id).indexOf(film.id);
  list.splice(indexToRemove, 1);
  setQueueToLocal(list);
  refs.queueBtn.setAttribute('data-action', 'add');
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
  const type = typeof res === 'Number' ? true : false;
  return type;
}
export function isInQueue(filmId) {
  const queueList = getQueueFromLocal();
  const res = queueList.find(el => el.id === filmId);
  const type = typeof res === 'Number' ? true : false;
  return type;
}

export function renderRemoveFromWatched() {
  refs.watchedBtn.innerHTML = 'Remove from watched';
  refs.watchedBtn.setAttribute('data-action', 'remove');
}
export function renderRemoveFromQueue() {
  refs.queueBtn.innerHTML = 'Remove from queue';
  refs.queueBtn.setAttribute('data-action', 'remove');
}
export function renderAddToWatched() {
  refs.watchedBtn.innerHTML = 'Add to watched';
  refs.watchedBtn.setAttribute('data-action', 'add');
}
export function renderAddToQueue() {
  refs.queueBtn.innerHTML = 'Add to queue';
  refs.queueBtn.setAttribute('data-action', 'add');
}

export function checkWatchedDataAction() {
  return refs.watchedBtn.getAttribute('data-action');
}
export function checkQueueDataAction() {
  return refs.queueBtn.getAttribute('data-action');
}

export function getCorrectWatchedButtons(id) {
  if (isInWatched(id)) {
    renderRemoveFromWatched();
    return;
  } else {
    renderAddToWatched();
    return;
  }
}

export function getCorrectQueueButtons(id) {
  if (isInQueue(id)) {
    renderRemoveFromQueue();
    return;
  } else {
    renderAddToQueue();
    return;
  }
}

export function getCorrectButtons(id) {
  getCorrectWatchedButtons(id);
  getCorrectQueueButtons(id);
  return;
}

// end functions

// tests
// addFilmToQueue(filmToCheckOne);
// console.log('object 1:>> ', isInQueue(filmToCheckTwo));
// removeFilmFromQueue(filmToCheckOne);
// addFilmToQueue(film)
// console.log('object 2:>> ', isInQueue(filmToCheckTwo));
