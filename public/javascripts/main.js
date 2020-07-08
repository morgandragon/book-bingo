$(document).ready(function() {
  $('.delete-book').on('click', function(e) {
    $target = $(e.target);
    const id = $target.attr('data-id');

    if (confirm('This operation cannot be undone. Are you sure?')) {
      $.ajax({
        type:'DELETE',
        url:'/books/'+id,
        success: function(response) {
          window.location.href='/';
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

  $('.bingosquareselect').select2({
    scroleAfterSelect: "true"
  });
});
