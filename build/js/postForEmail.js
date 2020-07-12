$("#calculate-form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: '/php/calculate.php',
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
            if(data === 'success') {
                form.addClass('success');
            } else if(data === 'error') {
                form.addClass('error');
            }
        }
    });
});

$("#callback-form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: '/php/callback.php',
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
            if(data === 'success') {
                form.addClass('success');
            } else if(data === 'error') {
                form.addClass('error');
            }
        }
    });

});

$("#auth-form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: '/php/auth.php',
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
            if(data === 'success') {
                form.addClass('success');
            } else if(data === 'error') {
                form.addClass('error');
            }
        }
    });

});