import cardFilm from '../templates/card';

import APi from './apiService.js';


const cardList = document.querySelector('.card__list');



async function renderPage() {
    const trends = await APi.fetchTrending().then((data) => {
      return data;
    });
    const genres = await APi.getGenresList().then((list) => {
      return list.genres;
    });
      const result = await createObj(trends, genres);
  
    console.log("result :>> ", result);
      cardList.insertAdjacentHTML('beforeEnd', cardFilm(result))
  }
  renderPage();

function createYear(obj) {
  return obj.release_date ? obj.release_date.slice(0, 4) : "";
}

function createPoster(obj) {
  return obj.poster_path
    ? "https://image.tmdb.org/t/p/w500" + obj.poster_path
    : "";
}

function createGenres(obj, list) {
    const movieGenreList = obj.genre_ids;
    const movieGenreArray = list.filter(item => movieGenreList.includes(item.id));
    const normalizedGenres = movieGenreArray.map((el) => el.name).join(', ');
    return normalizedGenres;
}

function createObj(data, list) {
  return data.map((obj) => ({
    ...obj,
    release_year: createYear(obj),
      poster: createPoster(obj),
    genres: createGenres(obj, list)
  }));
}