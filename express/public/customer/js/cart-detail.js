function checkNumber(e, input) {
    let quantity = document.getElementById("quantity").value;
    let code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
        if (quantity === "" || quantity == 0) {
            quantity = 1;
            document.getElementById("quantity").value = quantity;
        }

        sumMoney(quantity);
    }

    if (parseInt(quantity) > 99) {
        quantity = parseInt(quantity.slice(0,2));
        document.getElementById("quantity").value = quantity;
    }
    
}

function setNumber() {
    let quantity = document.getElementById("quantity").value;
    if (quantity === "") {
        quantity = 1;
        document.getElementById("quantity").value = quantity;
    }

    sumMoney(quantity);
}

function increaseQuantity() {
    let quantity = document.getElementById("quantity").value;

    if(parseInt(quantity) < 99) {
        quantity = parseInt(quantity) + 1;
        document.getElementById("quantity").value = quantity;
        sumMoney(quantity);
    }
}

function decreaseQuantity() {
    let quantity = document.getElementById("quantity").value;

    if(parseInt(quantity) > 1) {
        quantity = parseInt(quantity) - 1;
        document.getElementById("quantity").value = quantity;
        sumMoney(quantity);
    }
}

function sumMoney(quantity) {
    if(quantity !== "") {
        document.getElementById("number").innerText = 30000*quantity;
        formatNumber();
    }
}

function formatNumber() {
    let quantity = document.getElementById("quantity").value;
    if (quantity === "") {
        quantity = 1;
        document.getElementById("quantity").value = quantity;
    }

    let num = document.getElementById("number").innerText;
    document.getElementById("number").innerText = num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

window.onload = formatNumber();
