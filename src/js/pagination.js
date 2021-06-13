import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';
const API_KEY = 'a6a422d110dec9c7fa9eeee757b6f274';
const BASE_URL = 'https://api.themoviedb.org/3'

export let paginationNumber = 1;
// console.dir(pagination);
$('#pagination-container').pagination({
  dataSource: function (done) {
    var result = [];
    for (var i = 1; i < 1000; i++) {
        result.push(i);
    }
    done(result);
 },
  totalNumber: 1000,
      pageSize: 1,
			showPageNumbers: true,
			showPrevious: true,
			showNext: true,
			showNavigator: true,
			showFirstOnEllipsisShow: true,
			showLastOnEllipsisShow: true,
    callback: function(data, pagination) {

      console.log(API.page)
    },
})


// fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=a6a422d110dec9c7fa9eeee757b6f274").then(res=>res.json()).then(data=>{console.log(data)})

// $('#pagination-container').pagination({
//   dataSource: 'https://api.themoviedb.org/3/trending/movie/week?api_key=a6a422d110dec9c7fa9eeee757b6f274',
//   locator: function () {
//     // find data and return
//     return 'a.b';
// },
//   totalNumberLocator: function (res) {
//     return res.total_pages;
//   }
// })
