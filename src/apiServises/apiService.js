const API_KEY = 'a6a422d110dec9c7fa9eeee757b6f274';
const BASE_URL = 'https://api.themoviedb.org/3'

const searchOpt = {
    mediaType: 'movie',
    timeWindow: 'week',
}

export default {
    searchQuery: '',
    page: 1,

// поиск популярных фильмов для вывода на страницу
    fetchTrending() {
        const url = `${BASE_URL}/trending/${searchOpt.mediaType}/${searchOpt.timeWindow}?api_key=${API_KEY}`;
        return fetch(url)
        .then(res => res.json())
            .then(movies =>{ 
                console.log(movies);
                return movies.results
            })
    },
    
// поиск фильма по названию
    searchMovie() {
        const url = `${BASE_URL}/search/${searchOpt.mediaType}?api_key=${API_KEY}&query=${searchQuery}`;
        return fetch(url)
        .then(res => res.json())
            .then(movie =>{ 
                console.log(movie.results);
                return movie.results
            })
    },

// получение полной информации о фильме
    getMovieInfoById(id) {
        const url = `${BASE_URL}/${searchOpt.mediaType}/${id}?api_key=${API_KEY}`;
        return fetch(url)
            .then(res => res.json())
            .then(info =>{ 
                console.log(info);
                return info
            })
    },

// для работы со страницами (предварительно)
    resetPage() {
        this.page = 1;
    },
    incrementPage() {
        this.page += 1;
    },
// для работы со поисковым запросом (предварительно)
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
};