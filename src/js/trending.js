import cardFilm from '../templates/card';

import trendingFilm from '../apiServises/searchTrandingFilms';


const cardList = document.querySelector('.card__list');

trendingFilm.fetchTrending().then(renderCard);

function renderCard(results) {
    cardList.insertAdjacentHTML('afterbegin', cardFilm(results));
}


