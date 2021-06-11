import API from '../apiServises/apiService.js';
import pagination from 'paginationjs/dist/pagination.min.js';

$('#pagination-container').pagination({dataSource: [1, 2, 3, 4, 5, 6, 7,  40],
    pageSize: 5,
    showGoInput: true,
    showGoButton: true,})