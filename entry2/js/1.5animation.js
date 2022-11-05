const emojis = ["💰","💰","💰","💰","💰","💰","💰","💰","💰"]
const audio = new Audio('../audio/eliminate.mp3');

const generateDrops = (emoji) => {
	const drop = document.createElement("div");
	drop.classList.add("drop")
	drop.innerText = emojis[Math.floor(Math.random() * emojis.length)]
	drop.style.left = Math.random() * 100 + "vw";
	drop.style.animationDuration = Math.random() * 2 + 5 + "s"
	document.body.appendChild(drop)

	drop.addEventListener('click', function() {
		audio.pause();
		audio.currentTime = 0;
		audio.play();
		document.body.removeChild(drop);
	});

	setTimeout(function() {
		document.body.removeChild(drop)
	}, 10000)
}

//Generate drops every 100ms
setInterval(generateDrops, 100)

document.addEventListener('click', function() {
	const audio = document.getElementById('audio');
	audio.play();
});
