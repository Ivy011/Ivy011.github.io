
var components = document.getElementsByClassName('draggable');

for (let i = 0; i < components.length; i++) {
	const o = components[i];

	o.onmousedown = function (e) {
		if (o.setCapture) {   //IE低版本
			o.setCapture()
		}
		e = e || window.event
		//鼠标相对于盒子的位置
		var offsetX = e.clientX - o.offsetLeft;
		var offsetY = e.clientY - o.offsetTop;
		//鼠标移动
		document.onmousemove = function (e) {
			e = e || window.event
			o.style.left = e.clientX - offsetX + "px";
			o.style.top = e.clientY - offsetY + "px";
		}
		//鼠标抬起
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
			if (o.releaseCapture) {
				o.releaseCapture();//释放全局捕获
			}
		}
		return false;//标准浏览器的默认行为
	}
}

var backgrounds = ['./background/1.jpeg', './background/2.jpeg', './background/3.jpeg', './background/4.jpeg', './background/5.jpg', './background/6.jpg', './background/7.jpg', './background/8.jpg'];
var index = 0;
var body = document.getElementById('container');
body.style.backgroundImage = 'url(' + backgrounds[index] + ')';

document.getElementById('left').addEventListener('click', function() {
	if (index > 0) {
		index = index - 1;
		body.style.backgroundImage = 'url(' + backgrounds[index] + ')';
	}
});

document.getElementById('right').addEventListener('click', function() {
	if (index < 7) {
		index = index + 1;
		body.style.backgroundImage = 'url(' + backgrounds[index] + ')';
	}
});
