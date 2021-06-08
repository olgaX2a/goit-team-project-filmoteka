import movieService from '../apiServises/apiService';

// для рендера результатов поиска фильма (необходимо дорабатывать)
function movieSearchResults() {
    return movieService.searchMovie()
}
