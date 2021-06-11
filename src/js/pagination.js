import $ from 'jquery';
console.log($);

console.log(pagination);
$('#pagination-container').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7,195],
    callback: function(data, pagination) {
        // template method of yourself
        const html = template(data);
        $('#data-container').html(html);
    }
})

