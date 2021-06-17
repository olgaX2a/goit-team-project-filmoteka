const createYear = function(obj) {
  return obj.release_date ? obj.release_date.slice(0, 4) : "";
}

const createPoster = function(obj) {
  return obj.poster_path
    ? "https://image.tmdb.org/t/p/w500" + obj.poster_path
    : "https://cdn.pixabay.com/photo/2017/08/16/01/54/m-ms-2646242_640.png";
}

const createGenres = function(obj, list) {
    const movieGenreList = obj.genre_ids;
    const movieGenreArray = list.filter(item => movieGenreList.includes(item.id));
    const movieGenreArraySlise = movieGenreArray.slice(0, 3);
    const normalizedGenres = movieGenreArraySlise.map((el) => el.name).join(', ');
    return normalizedGenres;
}

export const createObj = function (data, list) {
  return data.map((obj) => ({
    ...obj,
    release_year: createYear(obj),
    poster: createPoster(obj),
    genres: createGenres(obj, list)
  }));
}