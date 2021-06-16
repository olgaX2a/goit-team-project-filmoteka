import { watchedTest, queueTest, filmToCheckOne, filmToCheckTwo, cruella } from './testFilms';
import cardFilm from '../templates/card';
import refs from './refs';

// export let targetFilm;
// ------start eventListeners------

// Library render
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
// ------END FUNCTIONS------

// ------END FUNCTIONS------
export function getFullLibraryFromLocal() {
  const watchedArray = getWatchedFromLocal();
  const queueArray = getQueueFromLocal();
  return watchedArray.concat(queueArray);
}

// export function onWatchedBtnClick() {
//   const action = checkWatchedDataAction();
//   console.log('action :>> ', action);
//   if (action === 'add') {
//     console.log('targetFilm in listener:>> ', targetFilm);
//     addFilmToWatched(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     renderRemoveFromWatched();
//     return;
//   }
//   if (action === 'remove') {
//     removeFilmFromWatched(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     renderAddToWatched();
//     return;
//   }
// }

// export function onQueueBtnClick() {
//   const action = checkQueueDataAction();
//   if (action === 'add') {
//     addFilmToQueue(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     renderRemoveFromQueue();
//     return;
//   }
//   if (action === 'remove') {
//     removeFilmFromQueue(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     renderAddToQueue();
//     return;
//   }
// }

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
