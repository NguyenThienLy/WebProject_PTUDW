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