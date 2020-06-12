$(document).ready(function () {
    $("form[name=frmInfoShow] input[name=radioSortInfoShow]").on("change", function () {
        $("form[name=frmInfoShow").submit();
    })

    $("form[name=frmInfoShow] select").on("change", function () {
        $("form[name=frmInfoShow").submit();
    })
});