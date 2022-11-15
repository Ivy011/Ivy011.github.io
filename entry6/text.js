const relations = {
	text_1: 'Y2K is a numeronym and was the common abbreviation for the year 2000 software problem. The abbreviation combines the letter Y for "year", the number 2 and a capitalized version of k for the SI unit prefix kilo meaning 1000; hence, 2K signifies 2000. It was also named the "millennium bug" because it was associated with the popular (rather than literal) rollover of the millennium, even though most of the problems could have occurred at the end of any century.',
	text_2: 'Banks, which calculate interest rates on a daily basis, faced real problems. Interest rates are the amount of money a lender, such as a bank, charges a customer, such as an individual or business, for a loan. Instead of the rate of interest for one day, the computer would calculate a rate of interest for minus almost 100 years!',
	text_3: 'They maintained that the continued viability of computerized systems was proof that the collective effort had succeeded. In following years, some analysts pointed out that programming upgrades that had been part of the Y2K-compliance campaign had improved computer systems and that the benefits of these improvements would continue to be seen for some time to come.'
}

Object.keys(relations).forEach(function (key) {
	document.getElementById(key).addEventListener('click', function () {
	document.getElementById('text_desc').style.opacity="100%"
	document.getElementById('text_desc').textContent = relations[key];
	});
});


document.querySelector('style').append(`canvas {
        position: fixed;
        left:0;
        top: 0;
        z-index: 9999;
        pointer-events: none;
    }`)
document.body.appendChild(document.createElement('canvas'))
const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')
cvs.width = document.documentElement.clientWidth
cvs.height = document.documentElement.clientHeight
const p = {
	x: 0,
	y: 0,
	r: 50
}
document.onmousemove = e => {
	p.x = e.clientX
	p.y = e.clientY
	render()
}
const render = () => {
	ctx.beginPath()
	ctx.clearRect(0, 0, cvs.width, cvs.height)
	var radial = ctx.createRadialGradient(p.x,p.y,p.r,p.x,p.y,p.r * 3);
	radial.addColorStop(0,'rgba(255, 255, 255, 0.3)');
	radial.addColorStop(1,'rgba(0, 0, 0, 1)');
	ctx.fillStyle = radial;
	ctx.fillRect(0,0,cvs.width, cvs.height);
}
render()
window.onresize = () => {
	cvs.width = document.documentElement.clientWidth
	cvs.height = document.documentElement.clientHeight
	render()
}
