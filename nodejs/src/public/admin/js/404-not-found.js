$("#go-back").click(function(event) {
    event.preventDefault();
    history.back(1);
});

document.addEventListener("DOMContentLoaded", function() {
	var arrayColor = ["#0000FF", "#FF0000", "#FF3300", "#00FF00", "#000000"];
	var body = document.body;

	setInterval(createStar, 50);

	function createStar() {
		var right = Math.floor(Math.random() * screen.width);
		var top = Math.floor(Math.random() * screen.height);
		var star = document.createElement("div");
		star.classList.add("star");
		body.appendChild(star);

		setInterval(runStar,10);

		star.style.top = top + "px";
		star.style.background = arrayColor[Math.floor(Math.random() * 5)];
		function runStar() {
			if (right >= screen.width)
				star.remove();
			right += 3;
			star.style.right = right + "px";
		}

		setTimeout(function() {
			star.remove();
		}, 6000);
	}
});
