$(document).ready(function () {
    // function submitForm(method){
    //     //set form action based on the method passed in the click handler, update/delete
    //     var formAction = `/customer/product/post-value-filter/${method}`;

    //     alert(formAction);

    //     //set form action
    //     $('form[name=frmProductShow]').attr('action', formAction);
    //     //submit form
    //     $('form[name=frmProductShow]').submit();
    // };

    // $("form[name=frmProductShow] btnApplyFilter").on("change", function () {
    //     alert("Haha");

    //     submitForm(apply);
    // })

    // $("form[name=frmProductShow] btnCancelFilter").on("change", function () {
    //     alert("Haha");

    //     submitForm(cancel);
    // })

    $("form[name=frmProductShow] input[name=radioSortProductShow]").on("change", function () {
        $("form[name=frmProductShow").submit();
    })

    $("form[name=frmProductShow] select").on("change", function () {
        $("form[name=frmProductShow").submit();
    })
});