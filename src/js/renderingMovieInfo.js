import movieService from '../apiServises/apiService';

// для рендера полной информации о фильме (необходимо дорабатывать)
function movieFullInfo(id) {
    return movieService.getMovieInfoById(id)
}