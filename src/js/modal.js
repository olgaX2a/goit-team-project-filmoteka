const modal = document.getElementById('my_modal');
const btn = document.getElementById('btn_modal_window');
const span = document.getElementsByClassName('close_modal_window')[0];


// btn.addEventListener('click', event => {
//   modal.style.display = 'block';
//   // const element = event.target.value;
//   // fetchFilms(157336);
// });

// span.addEventListener('click', event => {
//   modal.style.display = 'none';
// });

// window.addEventListener('click', event => {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// });

// function fetchFilms(movie_id) {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a6a422d110dec9c7fa9eeee757b6f274&language=en-US`,
//   )
//     .then(response => response.json())
//     .then(data => console.log(data));
// }
