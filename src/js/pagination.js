import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
const API_KEY = 'a6a422d110dec9c7fa9eeee757b6f274';
const BASE_URL = 'https://api.themoviedb.org/3'


// $('#pagination-container').pagination({dataSource: function(done){
//     var result = [];
//     for (var i = 1; i < 1000; i++) {
//         result.push(i);
//     }
//     done(result);
//  },
//   pageSize: 1,
//     callback: function(data, pagination) {

//     }
// })

// async function PagIsFetch() {
//   const data = await API.fetchTrending().then(data => console.log(data))
//   return data;
// }

fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=a6a422d110dec9c7fa9eeee757b6f274").then(res=>res.json()).then(data=>{console.log(data)})

$('#pagination-container').pagination({
  dataSource: 'https://api.themoviedb.org/3/trending/movie/week?api_key=a6a422d110dec9c7fa9eeee757b6f274',
  locator: function () {
    // find data and return
    return 'a.b';
},
  totalNumberLocator: function (res) {
    return res.total_pages;
  }
})
