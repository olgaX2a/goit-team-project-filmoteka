import { watchedTest, queueTest, filmToCheckOne, filmToCheckTwo, cruella } from './testFilms';
import cardFilm from '../templates/card';
import refs from './refs';

// export let targetFilm;
// ------start eventListeners------

// Library render
refs.libWatched.addEventListener('click', () => {
  clearContent(refs.cardList);
  const result = getWatchedFromLocal();
  if (result.length > 0) {
    hideEmptyLib();
    renderCardList(result);
    return;
  }
  if (result.length === 0) {
    renderEmptyLib();
    return;
  }
});

refs.libQueue.addEventListener('click', () => {
  clearContent(refs.cardList);
  const result = getQueueFromLocal();
  if (result.length > 0) {
    hideEmptyLib();
    renderCardList(result);
    return;
  }
  if (result.length === 0) {
    renderEmptyLib();
    return;
  }
});

refs.myLibraryLink.addEventListener('click', () => {
  clearContent(refs.cardList);
  const fullLibrary = getFullLibraryFromLocal();
  if (fullLibrary.length > 0) {
    hideEmptyLib();
    renderCardList(fullLibrary);
    return;
  }
  if (fullLibrary.length === 0) {
    renderEmptyLib();
    return;
  }
});
// ------END EVENT LISTENERS------

// ------START FUNCTIONS------
export function getFullLibraryFromLocal() {
  const watchedArray = getWatchedFromLocal();
  const queueArray = getQueueFromLocal();
  return watchedArray.concat(queueArray);
}

export function addFilmToWatched(film) {
  const userWatched = getWatchedFromLocal();
  userWatched.push(film);
  setWatchedToLocal(userWatched);
  refs.watchedBtn.setAttribute('data-action', 'remove');
}

export function addFilmToQueue(film) {
  const userQueue = getQueueFromLocal();
  console.log('userQueue before push:>> ', userQueue);
  userQueue.push(film);
  console.log('userQueue after push:>> ', userQueue);

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

export function renderCardList(markup) {
  refs.cardList.innerHTML = cardFilm(markup);
}

export function renderEmptyLib() {
  refs.emptyLib.classList.remove('hidden');
}
export function hideEmptyLib() {
  refs.emptyLib.classList.add('hidden');
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

export function setWatchedToLocal(moviesArray) {
  localStorage.setItem('watched', JSON.stringify(moviesArray));
}

export function setQueueToLocal(moviesArray) {
  localStorage.setItem('queue', JSON.stringify(moviesArray));
}

export function isInWatched(id) {
  const watchedList = getWatchedFromLocal();
  console.log('watchedList :>> ', watchedList);
  if (watchedList.length === 0) {
    return false;
  }
  if (watchedList.length > 0) {
    const res = watchedList.map(el => el.id).indexOf(id);
    return res < 0 ? false : true;
  }
}
export function isInQueue(id) {
  const queueList = getQueueFromLocal();
  console.log('queueList :>> ', queueList);
  if (queueList.length === 0) {
    return false;
  }
  if (queueList.length > 0) {
    const res = queueList.map(el => el.id).indexOf(id);
    return res < 0 ? false : true;
  }
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

// ------END FUNCTIONS------

// tests
// addFilmToQueue(cruella);
// console.log('object 1:>> ', isInQueue(filmToCheckTwo));
// removeFilmFromQueue(filmToCheckOne);
// addFilmToQueue(film)
// console.log('object 2:>> ', isInQueue(filmToCheckTwo));
