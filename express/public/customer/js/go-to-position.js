$(document).ready(function () {
    var y = 0;
    var arrPositionDesc = [920, 1450, 2440, 3750];
    var arrInstancePositonDesc = [700, 1200, 1300, 1800, 2000, 2660, 3200, 4000];

    // $(window).scroll(function () {
    //     var scrollHeight = $(document).scrollTop().valueOf();

    //     if (arrInstancePositonDesc[0] < scrollHeight && scrollHeight < arrInstancePositonDesc[1])
    //         item1();
    //     else
    //         resetAll();

    //     if (arrInstancePositonDesc[2] < scrollHeight && scrollHeight < arrInstancePositonDesc[3])
    //         item2();
    //     else
    //         resetAll();

    //     if (arrInstancePositonDesc[4] < scrollHeight && scrollHeight < arrInstancePositonDesc[5])
    //         item3();
    //     else
    //         resetAll();

    //     if (arrInstancePositonDesc[6] < scrollHeight && scrollHeight < arrInstancePositonDesc[7])
    //         item4();
    //     else
    //         resetAll();
    // }); 

    $("#sp-item-1").click(function () {
        window.scrollTo({ top: arrPositionDesc[0], behavior: 'smooth' });

        item1();
    });

    $("#sp-item-2").click(function () {
        window.scrollTo({ top: arrPositionDesc[1], behavior: 'smooth' });

        item2();
    });

    $("#sp-item-3").click(function () {
        window.scrollTo({ top: arrPositionDesc[2], behavior: 'smooth' });

        item3();
    });

    $("#sp-item-4").click(function () {
        window.scrollTo({ top: arrPositionDesc[3], behavior: 'smooth' });

        item4();
    });


    function resetAll() {
        $("#div-item-1").css("opacity", "0.3");
        $("#div-item-1").css("filter", "alpha(opacity=30)");

        $("#div-item-2").css("opacity", "0.3");
        $("#div-item-2").css("filter", "alpha(opacity=30)");

        $("#div-item-3").css("opacity", "0.3");
        $("#div-item-3").css("filter", "alpha(opacity=30)");

        $("#div-item-4").css("opacity", "0.3");
        $("#div-item-4").css("filter", "alpha(opacity=30)");
    }

    function item1() {
        $("#div-item-1").css("opacity", "1");
        $("#div-item-1").css("filter", "alpha(opacity=100)");

        $("#div-item-2").css("opacity", "0.3");
        $("#div-item-2").css("filter", "alpha(opacity=30)");

        $("#div-item-3").css("opacity", "0.3");
        $("#div-item-3").css("filter", "alpha(opacity=30)");

        $("#div-item-4").css("opacity", "0.3");
        $("#div-item-4").css("filter", "alpha(opacity=30)");
    }

    function item1() {
        $("#div-item-1").css("opacity", "1");
        $("#div-item-1").css("filter", "alpha(opacity=100)");

        $("#div-item-2").css("opacity", "0.3");
        $("#div-item-2").css("filter", "alpha(opacity=30)");

        $("#div-item-3").css("opacity", "0.3");
        $("#div-item-3").css("filter", "alpha(opacity=30)");

        $("#div-item-4").css("opacity", "0.3");
        $("#div-item-4").css("filter", "alpha(opacity=30)");
    }

    function item2() {
        $("#div-item-1").css("opacity", "0.3");
        $("#div-item-1").css("filter", "alpha(opacity=30)");

        $("#div-item-2").css("opacity", "1");
        $("#div-item-2").css("filter", "alpha(opacity=100)");

        $("#div-item-3").css("opacity", "0.3");
        $("#div-item-3").css("filter", "alpha(opacity=30)");

        $("#div-item-4").css("opacity", "0.3");
        $("#div-item-4").css("filter", "alpha(opacity=30)");
    }

    function item3() {
        $("#div-item-1").css("opacity", "0.3");
        $("#div-item-1").css("filter", "alpha(opacity=30)");

        $("#div-item-2").css("opacity", "0.3");
        $("#div-item-2").css("filter", "alpha(opacity=30)");

        $("#div-item-3").css("opacity", "1");
        $("#div-item-3").css("filter", "alpha(opacity=100)");

        $("#div-item-4").css("opacity", "0.3");
        $("#div-item-4").css("filter", "alpha(opacity=30)");
    }

    function item4() {
        $("#div-item-1").css("opacity", "0.3");
        $("#div-item-1").css("filter", "alpha(opacity=30)");

        $("#div-item-2").css("opacity", "0.3");
        $("#div-item-2").css("filter", "alpha(opacity=30)");

        $("#div-item-3").css("opacity", "0.3");
        $("#div-item-3").css("filter", "alpha(opacity=30)");

        $("#div-item-4").css("opacity", "1");
        $("#div-item-4").css("filter", "alpha(opacity=100)");
    }
});