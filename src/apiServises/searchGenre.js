const API_KEY = 'a6a422d110dec9c7fa9eeee757b6f274'

function fetchGenre() {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
        .then(res => res.json())
            .then(genres => console.log(genres)); 
    } catch (error) { 
        console.log(error);
    }
    
            
}

export default { fetchGenre};