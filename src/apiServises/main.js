import cards from '../handlbars/main.hbs';
import APi from './key.js';

const cardEl = document.querySelector('header');

async function renderPage() {
  const data = await APi.fetchTrending().then(data => { return data});
  const result = await createObj(data);
  cardEl.insertAdjacentHTML('afterend', cards(result))
}

renderPage()

function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}

function createObj(data) {
  return data.map(obj => ({
    ...obj,
    release_date: createYear(obj),
  }));
}
