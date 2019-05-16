var config = {
	'.chosen-select': {},
	'.chosen-select-deselect': { allow_single_deselect: true },
	'.chosen-select-no-single': { disable_search_threshold: 10 },
	'.chosen-select-no-result': { no_results_text: 'Không có gì để chọn' },
	'.chosen-select-width': { width: "95%" }
}

for (var selector in config) {
	$(selector).chosen(config[selector]);
}

function readURL(input) {

	if (input.files && input.files[0]) {
	  var reader = new FileReader();
  
	  reader.onload = function(e) {
		$('#blah').attr('src', e.target.result);
	  }
  
	  reader.readAsDataURL(input.files[0]);
	}
  }
  
  $("#imgInp").change(function() {
	readURL(this);
});