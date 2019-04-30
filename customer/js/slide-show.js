let id = 0;
$('#carousel-promotion').on('slide.bs.carousel', function (ev) {
    id = $(this).find('.active').index();
    changeEffect();
});

let arrEffect = ['slideInDown', 'slideInUp', 'fadeIn', 'pulse', 'zoomIn']

function changeEffect(){ 
    let slider1 = document.getElementById("img1");
    let slider2 = document.getElementById("img2");
    let slider3 = document.getElementById("img3");
    let arrSlider = [slider1, slider2, slider3];

    for (let j = 0; j < arrSlider.length; j++) {
        if(id == j) {
            continue;
        }
        for(let i = 0; i < arrEffect.length; i++) {
            if (arrSlider[j].classList.contains(arrEffect[i])) {
                arrSlider[j].classList.remove(arrEffect[i]);
                let number = getRndInteger(0, arrEffect.length - 1, i);
                arrSlider[j].classList.add(arrEffect[number]);
                break;
            }
        }
    }
}

function getRndInteger(min, max, i) {
    let random = Math.floor(Math.random() * (max - min + 1) ) + min;
    while(random === i) {
        random = Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    return random;
}
