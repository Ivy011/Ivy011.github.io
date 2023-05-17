const street = document.getElementById("street");
const scene1 = document.getElementById("scene_1");
const modal = document.getElementById("modal");
const closeImg = document.getElementById("close_img");
// const backImg = document.getElementById("back_img");
const message = document.getElementById("message");
const book = document.getElementById("book");
const mobile = document.getElementById("mobile");
const desktop = document.getElementById("desktop");
const fullImg = document.getElementById("full_img");
const hideImg = document.getElementById("hide_img");
// const footprint1 = document.getElementById("footprint_1");
// const footprint2 = document.getElementById("footprint_2");
// const footprint3 = document.getElementById("footprint_3");
const name = document.getElementById("name");
const feature = document.getElementById("feature");
const story = document.getElementById("story");
const albumImgs = document.getElementById("album_imgs");
const book2 = document.getElementById("book2");
const gesture = document.getElementById("gesture");
const gestureUp = document.getElementById("gesture_up");
const gestureRight = document.getElementById("gesture_right");
const gestureDown = document.getElementById("gesture_down");
const gestureLeft = document.getElementById("gesture_left");
const peopleImg = document.getElementById("people_img");

const collect = document.getElementById("collect");
const explore = document.getElementById("explore");
const all = document.getElementById("all");
const streetDone = document.getElementById("street_done");

let data;
let index = 0;
let streetIndex = 1;

let activeIndex = [];

// footprint1.addEventListener("click", nextStreet);
// footprint2.addEventListener("click", nextStreet);
// footprint2.addEventListener("click", nextStreet);
gestureLeft.style.display = "none";

function nextStreet() {
  streetIndex++;
  if (streetIndex > 34) {
    streetIndex = 1;
  }
  index = streetIndex - 1;
  if (activeIndex.indexOf(index) >=0 ) {
    streetDone.src = `images/People/${index+1}-3.png`;
    streetDone.style.display = "block";
  } else {
    streetDone.style.display = "none";
  }
  fullImg.src=`images/People/${data[index].Origin}`;
  hideImg.src=`images/People/${data[index].OriginB}`;
  message.textContent = data[index].Hint;
  street.src= `images/Street/${streetIndex}.jpg`;
}

function prevStreet() {
  streetIndex--;
  if (streetIndex < 1) {
    streetIndex = 34;
  }
  index = streetIndex - 1;
  if (activeIndex.indexOf(index) >=0 ) {
    streetDone.src = `images/People/${index+1}-3.png`;
    streetDone.style.display = "block";
  } else {
    streetDone.style.display = "none";
  }
  fullImg.src=`images/People/${data[index].Origin}`;
  hideImg.src=`images/People/${data[index].OriginB}`;
  message.textContent = data[index].Hint;
  street.src= `images/Street/${streetIndex}.jpg`;
}

window.addEventListener('message', e => {
  if (e.data) {
    if (e.data === "left") {
      gestureLeft.click();
    } else if (e.data === "right") {
      gestureRight.click();
    } else if (e.data === "up") {
      gestureUp.click();
    } else if (e.data === "down") {
      gestureDown.click();
    } else {
      streetIndex = e.data.index;
      index = streetIndex - 1;
      if (activeIndex.indexOf(index) >=0 ) {
        streetDone.src = `images/People/${index+1}-3.png`;
        streetDone.style.display = "block";
      } else {
        streetDone.style.display = "none";
      }
      fullImg.src=`images/People/${data[index].Origin}`;
      hideImg.src=`images/People/${data[index].OriginB}`;
      message.textContent = data[index].Hint;
      street.src= `images/Street/${streetIndex}.jpg`;
    }
  }
},false);

gestureUp.addEventListener("click", () => {
  prevStreet()
  gesture.style.display = "block";
});
gestureDown.addEventListener("click", () => {
  nextStreet()
});
gestureLeft.addEventListener("click", () => {
  street.style.display = "block";
  scene1.querySelector(".hide-img").style.display = "block";
  scene1.style.display = "none";
  gestureLeft.style.display = "none";
  gestureRight.style.display = "inline-block";
  gestureUp.style.display = "inline-block";
  gestureDown.style.display = "inline-block";

  index++;
  fullImg.src=`images/People/${data[index].Origin}`;
  hideImg.src=`images/People/${data[index].OriginB}`;
  message.textContent = data[index].Hint;
});

gesture.addEventListener("click", () => {
  gesture.style.display = "none";
});

gestureRight.addEventListener("click", () => {
  // gesture.style.display = "none";
  // street.style.display = "block";
  // scene1.querySelector(".hide-img").style.display = "block";
  // scene1.style.display = "none";
  // // backImg.style.display = "none";
  //
  // index++;
  // if (index > 34) {
  //   index = 0;
  // }
  // fullImg.src=`images/People/${data[index].Origin}`;
  // hideImg.src=`images/People/${data[index].OriginB}`;
  // message.textContent = data[index].Hint;
  street.style.display = "none";
  scene1.style.display = "block";
  gestureLeft.style.display = "inline-block";
  gestureRight.style.display = "none";
  gestureUp.style.display = "none";
  gestureDown.style.display = "none";
});

street.addEventListener("click", () => {
  // street.style.display = "none";
  // footprint1.style.display = "none";
  // footprint2.style.display = "none";
  // footprint3.style.display = "none";
  // scene1.style.display = "block";
});

closeImg.addEventListener("click", () => {
  modal.style.display = "none";
  scene1.querySelector(".hide-img").style.display = "none";
  // backImg.style.display = "block";
});

scene1.addEventListener("click", () => {
  activeIndex.push(index);
  name.textContent = data[index].Object;
  peopleImg.src = "images/People/" + data[index].PngW;
  story.innerHTML = data[index].Story + `<div style="text-align: right;margin-top: 10px">--${data[index].Storyteller}</div>`;
  modal.style.display = "block";
  albumImgs.querySelectorAll('.album-img').forEach(item => {
   const names = item.src.split('\/');
   const name = names[names.length -1];
   const itemIndex = name.split('-')[0];
    if (itemIndex == index + 1) {
      item.src = `images/People/${itemIndex}-3.png`;
      parent.postMessage(itemIndex, "*");
    }
  });
});

// backImg.addEventListener("click", () => {
//   street.style.display = "block";
//   // footprint1.style.display = "block";
//   // footprint2.style.display = "block";
//   // footprint3.style.display = "block";
//   scene1.querySelector(".hide-img").style.display = "block";
//   scene1.style.display = "none";
//   backImg.style.display = "none";
//
//   index++;
//   fullImg.src=`images/People/${data[index].Origin}`;
//   hideImg.src=`images/People/${data[index].OriginB}`;
//   message.textContent = data[index].Hint;
// });

book.addEventListener("click", () => {
  mobile.style.display = "none";
  desktop.style.display = "flex";
});

book2.addEventListener("click", () => {
  mobile.style.display = "flex";
  desktop.style.display = "none";
});

document.querySelectorAll(".album-img").forEach(item => {
  item.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

fetch('data.json')
.then(res => res.json())
.then(res => {
  data = res;
  fullImg.src=`images/People/${data[index].Origin}`;
  hideImg.src=`images/People/${data[index].OriginB}`;
  message.textContent = data[index].Hint;
  data.forEach(item => {
    const img = document.createElement('img');
    img.addEventListener("click", () => {
      if (img.src.indexOf('-4') === -1) {
        modal.style.display = "block";
      } else {
        const names = img.src.split('\/');
        const name = names[names.length -1];
        const itemIndex = name.split('-')[0];
        streetIndex = Number(itemIndex)
        index = streetIndex - 1;
        fullImg.src=`images/People/${data[index].Origin}`;
        hideImg.src=`images/People/${data[index].OriginB}`;
        message.textContent = data[index].Hint;
        street.src= `images/Street/${streetIndex}.jpg`;
        mobile.style.display = "flex";
        desktop.style.display = "none";

        street.style.display = "block";
        scene1.querySelector(".hide-img").style.display = "block";
        scene1.style.display = "none";
        gestureLeft.style.display = "none";
        gestureRight.style.display = "inline-block";
        gestureUp.style.display = "inline-block";
        gestureDown.style.display = "inline-block";
      }
    })
    img.className = 'album-img';
    img.src = `images/People/${item.PngB}`;
    albumImgs.appendChild(img);
  });
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

document.querySelector("main").addEventListener("touchstart", touchstartHandler, false);
document.querySelector("main").addEventListener("touchmove", touchmoveHandler, false);
document.querySelector("main").addEventListener("touchend", touchendHandler, false);


document.querySelector("main").addEventListener("mousedown", touchstartHandler, false);
document.querySelector("main").addEventListener("mousemove", touchmoveHandler, false);
document.querySelector("main").addEventListener("mouseup", touchendHandler, false);

function LongPress(e){
  const x = e.clientX;
  const y = e.clientY;
  gesture.style.display = "block";
  gesture.style.top = (y - 75) + "px";
  gesture.style.left = (x - 75) + "px";
}

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
