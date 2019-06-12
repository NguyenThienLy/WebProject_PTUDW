$(function () {
    tinymce.init({
        selector: '#my_editor',
        height: 400,
        menubar: false,
        plugins: 'paste image link autolink lists table media',
        toolbar: [
            'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright',
            'forecolor backcolor',
            'table link image media',
        ],
    });
})

$(function () {
    tinymce.init({
        selector: '#my_editor_combo',
        height: 400,
        menubar: false,
        plugins: 'paste image link autolink lists table media',
        toolbar: [
            'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright',
            'forecolor backcolor',
            'table link image media',
        ],
    });
})