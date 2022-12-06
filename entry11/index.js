const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", function(event) {
	if (event.target.checked) {
		setTimeout(function() {
			window.location.href = "../index/index.html";
		}, 500);
	}
});
