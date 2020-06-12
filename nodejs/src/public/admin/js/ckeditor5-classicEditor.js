ClassicEditor.create(document.querySelector("#my_editor"))
  .then(editor => {
    window.myEditor = editor;
  })
  .catch(err => {
    console.error(err.stack);
  });