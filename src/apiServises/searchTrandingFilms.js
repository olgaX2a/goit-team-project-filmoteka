const API_KEY = 'a6a422d110dec9c7fa9eeee757b6f274';
const BASE_URL = 'https://api.themoviedb.org/3';

const searchOpt = {
  mediaType: 'movie',
  timeWindow: 'week',
  page: '3',
};

function fetchTrending() {
  try {
    const url = `${BASE_URL}/trending/${searchOpt.mediaType}/${searchOpt.timeWindow}?api_key=${API_KEY}&page=${searchOpt.page}`;
    return fetch(url)
      .then(res => res.json())
      .then(movies => {
        console.log(movies);
        return movies.results;
      });
  } catch (error) {
    console.log(error);
  }
}

export default { fetchTrending };
