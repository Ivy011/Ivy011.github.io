const mask = document.getElementById("mask");
const mask1 = document.getElementById("mask1");
const mask2 = document.getElementById("mask2");
const deskModal = document.getElementById("desk-modal");
const deskModal1 = document.getElementById("desk-modal1");
const deskModal2 = document.getElementById("desk-modal2");
const deskModal3 = document.getElementById("desk-modal3");
const closeImg = document.getElementById("close_img");
const closeImg1 = document.getElementById("close_img1");
const closeImg2 = document.getElementById("close_img2");
const closeImg3 = document.getElementById("close_img3");
const albumImgs = document.getElementById("album_imgs");
const albumImgs2 = document.getElementById("album_imgs2");
const collect = document.getElementById("collect");
const explore = document.getElementById("explore");
const all = document.getElementById("all");
const startBg = document.getElementById("start_bg");
const startMobileBg = document.getElementById("start_mobile_bg");
const hintBg = document.getElementById("hint_bg");

const iframe = document.querySelector("iframe");

const gesture = document.getElementById("gesture");
const gestureUp = document.getElementById("gesture_up");
const gestureRight = document.getElementById("gesture_right");
const gestureDown = document.getElementById("gesture_down");
const gestureLeft = document.getElementById("gesture_left");

const name = document.getElementById("name");
const feature = document.getElementById("feature");
const story = document.getElementById("story");
const peopleImg = document.getElementById("people_img");

gestureLeft.style.display = "none";

mask.addEventListener("click", () => {
  deskModal.style.display = "block";
});

hintBg.addEventListener("click", () => {
  hintBg.style.display = "none";
});

mask1.addEventListener("click", () => {
  deskModal1.style.display = "block";
});

closeImg.addEventListener("click", () => {
  deskModal.style.display = "none";
});

closeImg1.addEventListener("click", () => {
  deskModal1.style.display = "none";
  startBg.style.display = "none";
  startMobileBg.style.display = "none";
  document.querySelector("#desk-modal1 .modal-inner").style.width = "80vw";
  document.querySelector("#desk-modal1 .modal-inner").style.height = "700px";
  document.querySelector("#desk-modal1 .modal-inner").style.top = "109px";
});

closeImg2.addEventListener("click", () => {
  deskModal2.style.display = "none";
})

mask2.addEventListener("click", () => {
  deskModal3.style.display = "block";
})

closeImg3.addEventListener("click", () => {
  deskModal3.style.display = "none";
})

fetch('data.json')
  .then(res => res.json())
  .then(res => {
    const data = res;
    data.forEach((item, index) => {
      const img = document.createElement('img');
      img.addEventListener("click", () => {
        if (img.src.indexOf('-4') === -1) {
          deskModal2.style.display = "block";
          name.textContent = item.Object;
          peopleImg.src = "images/People/" + item.PngW;
          story.innerHTML = item.Story + `<div style="text-align: right;margin-top: 10px">--${item.Storyteller}</div>`;
        }
      })
      img.className = 'album-img';
      img.src = `images/People/${item.PngB}`;
      albumImgs.appendChild(img);

      const img1 = document.createElement('img');
      img1.addEventListener("click", () => {
        const names = img.src.split('\/');
        const name = names[names.length -1];
        const itemIndex = name.split('-')[0];
        iframe.contentWindow.postMessage({ index:itemIndex }, "*")
        deskModal3.style.display = "none";
        img1.src = `images/People/${item.PngW}`
      })
      img1.className = 'album-img';
      img1.src = `images/People/${item.PngB}`;
      img1.style.marginLeft = (index % 2 === 0 ? 0 : 250) + "px";
      albumImgs2.appendChild(img1)
    });
  });

collect.addEventListener("click", () => {
  const imgs = document.querySelectorAll("#album_imgs img");
  imgs.forEach(img => {
    img.style.display = "inline-block";
    if (img.src.indexOf("-3") === -1) {
      img.style.display = "none";
    }
  });
});

explore.addEventListener("click", () => {
  const imgs = document.querySelectorAll("#album_imgs img");
  imgs.forEach(img => {
    img.style.display = "inline-block";
    if (img.src.indexOf("-3") >= 0) {
      img.style.display = "none";
    }
  });
});

all.addEventListener("click", () => {
  const imgs = document.querySelectorAll("#album_imgs img");
  imgs.forEach(img => {
    img.style.display = "inline-block";
  });
});

window.addEventListener('message', e => {
  if (!isNaN(e.data)) {
    const albumImgs = document.getElementsByClassName("album-img");
    for (let i = 0; i < albumImgs.length; i++) {
      const names = albumImgs[i].src.split('\/');
      const name = names[names.length -1];
      const itemIndex = name.split('-')[0];
      if (itemIndex == e.data) {
        albumImgs[i].src = `images/People/${itemIndex}-3.png`;
      }
    }
  }
},false);

gestureUp.addEventListener("click", () => {
  iframe.contentWindow.postMessage("up", "*")
});
gestureDown.addEventListener("click", () => {
  iframe.contentWindow.postMessage("down", "*")
});
gestureLeft.addEventListener("click", () => {
  iframe.contentWindow.postMessage("left", "*")
  gestureUp.style.display = "block";
  gestureDown.style.display = "block";
  gestureRight.style.display = "block";
  gestureLeft.style.display = "none";
});

gestureRight.addEventListener("click", () => {
  iframe.contentWindow.postMessage("right", "*")
  gestureUp.style.display = "none";
  gestureDown.style.display = "none";
  gestureRight.style.display = "none";
  gestureLeft.style.display = "block";
});

gesture.addEventListener("click", () => {
  gesture.style.display = "none";
});

let timer=null;

const touchstartHandler = function(event) {
  // event.preventDefault();
  timer=setTimeout(() => LongPress(event),500);
}

const touchmoveHandler = function(event) {
  event.preventDefault();
  clearTimeout(timer);
  timer=null;
}

const touchendHandler=function(event){
  event.preventDefault();
  clearTimeout(timer);
  return false;
}

document.body.addEventListener("touchstart", touchstartHandler, false);
document.body.addEventListener("touchmove", touchmoveHandler, false);
document.body.addEventListener("touchend", touchendHandler, false);

document.body.addEventListener("mousedown", touchstartHandler, false);
document.body.addEventListener("mousemove", touchmoveHandler, false);
document.body.addEventListener("mouseup", touchendHandler, false);

function LongPress(e){
  const x = e.clientX;
  const y = e.clientY;
  gesture.style.display = "block";
  gesture.style.top = (y - 75) + "px";
  gesture.style.left = (x - 75) + "px";
}
