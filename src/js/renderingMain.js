import movieService from '../apiServises/apiService';

// для рендера главной (необходимо дорабатывать)
function mainPage() {
    return movieService.fetchTrending()
}
