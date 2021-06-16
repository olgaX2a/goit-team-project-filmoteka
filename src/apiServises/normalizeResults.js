const createYear = function (obj) {
  return obj.release_date ? obj.release_date.slice(0, 4) : '';
};

const createPoster = function (obj) {
  return obj.poster_path ? 'https://image.tmdb.org/t/p/w500' + obj.poster_path : '';
};

const createPopularityRate = function (obj) {
  return obj.popularity ? obj.popularity.toFixed(1) : '-';
};

const createGenres = function (obj, list) {
  const movieGenreList = obj.genre_ids;
  const movieGenreArray = list.filter(item => movieGenreList.includes(item.id));
  const movieGenreArraySlise = movieGenreArray.slice(0, 3);
  const normalizedShortGenres = movieGenreArraySlise.map(el => el.name).join(', ');
  return normalizedShortGenres;
};

const createFullGenresArrayFromInfo = function (obj) {
  const movieGenreArray = obj.genres.map(el => el.name);
  return movieGenreArray;
};

const createFullGenresStringFromInfo = function (obj) {
  const movieGenreString = obj.genres.map(el => el.name).join(', ');
  return movieGenreString;
};

const createShortGenresStringFromInfo = function (obj) {
  const movieGenreString = obj.genres
    .map(el => el.name)
    .slice(0, 3)
    .join(', ');
  return movieGenreString;
};

export const createObj = function (data, list) {
  return data.map(obj => ({
    ...obj,
    popularity_rate: createPopularityRate(obj),
    release_year: createYear(obj),
    poster: createPoster(obj),
    genres_short_list: createGenres(obj, list),
  }));
};

export const createInfoObj = function (obj) {
  (obj.popularity_rate = createPopularityRate(obj)),
    (obj.release_year = createYear(obj)),
    (obj.poster = createPoster(obj)),
    (obj.genres_short_list = createShortGenresStringFromInfo(obj)),
    (obj.genres_full_array = createFullGenresArrayFromInfo(obj));
  return obj;
};
