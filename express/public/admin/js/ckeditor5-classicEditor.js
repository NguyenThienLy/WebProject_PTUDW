let my_editor;

ClassicEditor.create(document.querySelector("#my_editor"))
  .then(newEditor => {
    my_editor = newEditor;
  })
  .catch(err => {
    console.error(err.stack);
  });

function loadEditorData(data) {}
