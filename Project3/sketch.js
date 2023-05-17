let data, url;
let itemNum = 1000;

// actual values from dataset
let latitudes = [];
let longitudes = [];
let filterLocations = [];

// x y coordinates on canvas
let xCoords = [];
let yCoords = [];
let bg;
let m;
let limitVal;

let infos = [
  { name: "Daffodil", desc: "Daffodils, with their bright white trumpet-shaped flowers, are a common springtime sight in New York City, bringing pops of color and cheer to parks, gardens, and streetscapes." },
  { name: "Sage flower", desc: "Sage flowers, with their fragrant leaves and attractive blooms, are commonly found in gardens and green spaces throughout New York City, and they are known to attract bees and butterflies." },
  { name: "Cherry blossom", desc: "Cherry blossoms, with their delicate pink petals, are a beloved springtime symbol in New York City."},
  { name: "Tulip", desc: "Tulips, are a common sight in New York City's parks and public spaces in the spring, especially at the annual Tulip Festival held in Albany." },
  { name: "Rose", desc: "Roses are a common and beloved flower in New York City, found in gardens and parks throughout the city, adding beauty and elegance to the urban landscape." },
  { name: "Lavender", desc: "Lavender, with its fragrant purple blooms, can be found in various gardens and parks throughout New York City, where it is valued for its calming properties and ornamental beauty."},
  { name: "Sunflower ", desc: "Sunflowers are a bright and cheerful summer flower commonly found in gardens and parks throughout New York City, with their tall stems and large, distinctively shaped flower heads."},
  { name: "Irise", desc: "Irises are a type of perennial flower with distinctive sword-shaped leaves and intricate blooms, commonly found in gardens and parks throughout New York City." },
  { name: "Dahlia", desc: "Dahlias, with their diverse range of colors, shapes, and sizes, are a popular addition to New York City's flower gardens and can be seen blooming throughout the summer months." },
  { name: "Gypsophila", desc: "Gypsophila, also known as Baby's Breath, is a wildflower that grows abundantly in open fields in newyork." },
  { name: "Chrysanthemum", desc: "Chrysanthemums are a beloved fall flower in New York City, often seen in flower markets, parks, and as decorative elements in festivals and events due to their striking colors and long blooming season, which make them closely associated with the fall and the festive season." },
  { name: "Marigold", desc: "Marigolds, with their bright and bold hues of orange and yellow, are a common sight in New York's community gardens and urban landscapes, blooming throughout the summer and fall seasons." },
]

let colors = ["#00000", "#4b0076", "#a693da", "#fff017", "#c57d9b", "#a693da", "#EED202", "#710193", "#051094", "#0492c2", "#f0e7e7", "#ffa701"];

let IncMap = {
  f1: {
    r1: 20,
    r2: 12,
    a1Inc: 490,
    a2Inc: 10,
  },
  f2: {
    r1: 10,
    r2: 30,
    a1Inc: 490,
    a2Inc: 20,
  },
  f3: {
    r1: 6,
    r2: 30,
    a1Inc: 6,
    a2Inc: 1,
  },
  f4: {
    r1: 30,
    r2: 12,
    a1Inc: 7,
    a2Inc: 10,
  },
  f5: {
    r1: 20,
    r2: 10,
    a1Inc: 6,
    a2Inc: 1,
  },
  f6: {
    r1: 24.5,
    r2: 15,
    a1Inc: 6,
    a2Inc: 300,
  },
  f7: {
    r1: 30,
    r2: 20,
    a1Inc: 0.5,
    a2Inc: 15,
  },
  f8: {
   r1: 25,
    r2: 11.25,
    a1Inc: 300,
    a2Inc: 10,
  },
  f9: {
    r1: 10,
    r2: 20,
    a1Inc: 50,
    a2Inc: 250,
  },
  f10: {
    r1: 15,
    r2: 20,
    a1Inc: 6,
    a2Inc: 60,
  },
  f11: {
  r1: 20,
    r2: 25,
    a1Inc: 300,
    a2Inc: 25,
  },
  f12: {
     r1: 25,
    r2: 12.5,
    a1Inc: 24,
    a2Inc: 100,
  }
}

function preload(){
  url = "./data.json";
  data = loadJSON(url);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES)
  m = new Date().getMonth() + 1;
  bg = loadImage(`images/${m}.jpg`);
}

function draw() {
  background(bg);
  let values = Object.values(data).filter(item => !filterLocations.includes(item.NAME));
  for (let i = 0; i < values.length; i++) {
    // store x and y information from dataset into empty array
    latitudes[i] = values[i].Longitude;
    longitudes[i] = values[i].Latitude;

    // map out the area of central park on p5 canvas
    xCoords[i] = map(latitudes[i], -74.9120852, -72.589811, 0, window.innerHeight);
    yCoords[i] = map(longitudes[i], 40.5003836, 40.9094586, 0, window.innerWidth);

    let keys = Object.keys(values[i]);

    if (keys.some(key => key.startsWith(m)) &&
      (limitVal === undefined || (
        (limitVal === 0 && values[i].ACRES < 10) ||
        (limitVal === 10 && values[i].ACRES >= 10 && values[i].ACRES < 60)  ||
        (limitVal === 60 && values[i].ACRES >= 60)
      ))) {
      let r1 = IncMap["f" + m].r1;
      let r2 = IncMap["f" + m].r2;
      let a1Inc = IncMap["f" + m].a1Inc;
      let a2Inc = IncMap["f" + m].a2Inc;
      if (values[i].ACRES >= 10 && values[i].ACRES < 60) {
        r1 = r1 * 1;
        r2 = r2 * 1;
      } else if (values[i].ACRES >= 60) {
        r1 = r1 * 1.5;
        r2 = r2 * 1.5;
      } else {
        r1 = r1 * 0.5;
        r2 = r2 * 0.5;
      }

      let flower = {
        r1: r1,
        r2: r2,
        tr1: 0,
        tr2: 0,
        a1Inc: a1Inc,
        a2Inc: a2Inc,
        a1: 0,
        a2: 0,
        prevX1: "",
        prevX2: "",
        x: yCoords[i],
        y: xCoords[i],
        c: colors[m-1]
      }
      // console.log(flower);
      drawFlower(flower);
    }
  }
}

function drawFlower(flower) {
  push();
  translate(flower.x, flower.y)
  stroke(255)

  for (var i = 0; i < 1000; i++) {
    var x1 = (frameCount < flower.r1 ? (flower.tr1 + frameCount) : flower.r1)  * cos(flower.a1)
    var y1 = (frameCount < flower.r1 ? (flower.tr1 + frameCount) : flower.r1)  * sin(flower.a1)

    var x2 = x1 + (frameCount < flower.r2 ? (flower.tr2 + frameCount) : flower.r2) * cos(flower.a2)
    var y2 = y1 + (frameCount < flower.r2 ? (flower.tr2 + frameCount) : flower.r2) * sin(flower.a2)

    stroke(flower.c)

    line(flower.prevX, flower.prevY, x2, y2)

    flower.prevX =x2
    flower.prevY=y2

    flower.a1 += flower.a1Inc
    flower.a2+= flower.a2Inc
  }

  pop();
}

let navbarItems = document.getElementsByClassName("navbar-item");
let low = document.getElementById("low");
let middle = document.getElementById("middle");
let height = document.getElementById("height");
let all = document.getElementById("all");
const sortTitle = document.getElementById("sort_title");
const navMonth = document.getElementById("nav_month");
const navAcres = document.getElementById("nav_acres");
const info = document.getElementById("info");
const infoName = document.getElementById("info_name");
const infoDesc = document.getElementById("info_desc");
const triangle = document.getElementById("triangle");
const sortMonth = document.getElementById("sort_month");
const sortAcres = document.getElementById("sort_acres");

infoName.textContent = infos[0].name;
infoDesc.textContent = infos[0].desc;

for (let i = 0; i < navbarItems.length; i++) {
  if (i === new Date().getMonth()) {
    navbarItems[i].classList.add("active");
  }
  navbarItems[i].addEventListener("click", () => {
    for (let i = 0; i < navbarItems.length; i++) {
      navbarItems[i].classList.remove("active");
    }
    m = Number(navbarItems[i].dataset.month);
    navbarItems[i].classList.add("active");
    bg = loadImage(`images/${m}.jpg`);
    infoName.textContent = infos[m - 1].name;
    infoDesc.textContent = infos[m - 1].desc;
    frameCount = 0;
  });
}

all.addEventListener("click", () => {
  limitVal = undefined;
});

low.addEventListener("click", () => {
  limitVal = 0;
});

middle.addEventListener("click", () => {
  limitVal = 10;
});

height.addEventListener("click", () => {
  limitVal = 60;
});

triangle.addEventListener("click", () => {
  if (triangle.classList.contains("active")) {
    triangle.classList.remove("active");
    sortTitle.classList.remove("active");
  } else {
    triangle.classList.add("active");
    sortTitle.classList.add("active");
  }
});

sortMonth.addEventListener("click", () => {
  navMonth.style.display = "flex";
  navAcres.style.display = "none";
  triangle.classList.remove("active");
  sortTitle.classList.remove("active");
  sortTitle.style.flexDirection = "column";
  sortTitle.style.justifyContent = "flex-start";
});

sortAcres.addEventListener("click", () => {
  navAcres.style.display = "flex";
  navMonth.style.display = "none";
  triangle.classList.remove("active");
  sortTitle.classList.remove("active");
  sortTitle.style.flexDirection = "column-reverse";
  sortTitle.style.justifyContent = "flex-end";
});
// sortTitle.addEventListener("click", () => {
//   if (sortTitle.textContent === "Sort by ACRES") {
//     sortTitle.textContent = "Sort by month";
//     navAcres.style.display = "flex";
//     navMonth.style.display = "none";
//   } else {
//     sortTitle.textContent = "Sort by ACRES";
//     navMonth.style.display = "flex";
//     navAcres.style.display = "none";
//   }
// });

info.addEventListener("mouseover", () => {
  console.log(11111);
  infoName.style.display = "none";
  infoDesc.style.display = "block";
});

info.addEventListener("mouseleave", () => {
  infoName.style.display = "block";
  infoDesc.style.display = "none";
});
