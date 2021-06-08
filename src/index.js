import './sass/main.scss';
import movieService from './apiServises/apiService';

// для рендера главной (необходимо дорабатывать)
function mainPage() {
    return movieService.fetchTrending()
}
// для рендера результатов поиска фильма (необходимо дорабатывать)
function movieSearchResults() {
    return movieService.movieSearch()
}
// для рендера полной информации о фильме (необходимо дорабатывать)
function movieFullInfo() {
    return movieService.getMovieInfoById()
}

