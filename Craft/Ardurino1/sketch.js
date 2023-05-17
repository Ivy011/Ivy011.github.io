let data, url;
let itemNum = 1000;

// actual values from dataset
let latitudes = [];
let longitudes = [];

// x y coordinates on canvas
let xCoords = [];
let yCoords = [];
let bg;
let m;
let limitVal;

let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem1101';  // fill in your serial port name here
let inData;
let outData;

let infos = [
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
  { name: "Sunflower", desc: "Sunflowers are a popular summer flower in New York City, often found in community gardens and parks, with their vibrant yellow petals and dark centers adding a cheerful touch to the urban landscape." },
]
let colors = ["#00000", "#4b0076", "#a693da", "#fff017", "#c57d9b", "#a693da", "#EED202", "#710193", "#051094", "#0492c2", "#f0e7e7", "#ffa701"]

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
  //console.log(data);
  //console.log(data[0]);
  //console.log(data[0].x);
  //console.log(data[0].y);
  //console.log(data[0].date);
  //console.log(latitudes);
  // noLoop();
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  inData=Number(serial.readLine());
  print(inData);
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

function draw() {
  background(bg);
  let values = Object.values(data);
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

// for (let i = 0; i < navbarItems.length; i++) {
//   navbarItems[i].addEventListener("click", () => {
//     m = Number(navbarItems[i].dataset.month);
//     bg = loadImage(`images/${m}.jpg`);
//     infoName.textContent = infos[m - 1].name;
//     infoDesc.textContent = infos[m - 1].desc;
//     frameCount = 0;
//   });
// }
function keyPressed() {
    if (key === "a") {
      m = 1;
      serial.write(key);
      // console.log(key);
    } else if (key === "b") {
      m = 2;
      serial.write(key);
    } else if (key === "c") {
      m = 3;
      serial.write(key);
    } else if (key === "d") {
      m = 4;
      serial.write(key);
    } else if (key === "e") {
      m = 5;
      serial.write(key);
    } else if (key === "f") {
      m = 6;
      serial.write(key);
    } else if (key === "g") {
      m = 7;
      serial.write(key);
    } else if (key === "h") {
      m = 8;
      serial.write(key);
    } else if (key === "i") {
      m = 9;
      serial.write(key);
    } else if (key === "j") {
      m = 10;
      serial.write(key);
    } else if (key === "k") {
      m = 11;
      serial.write(key);
    } else if (key === "l") {
      m = 12;
      serial.write(key);
    } else if (key === "s") {
      if (sortTitle.textContent === "Sort by Acres") {
        sortTitle.textContent = "Sort by Month";
        navAcres.style.display = "flex";
        navMonth.style.display = "none";
      } else {
        sortTitle.textContent = "Sort by ACRES";
        navMonth.style.display = "flex";
        navAcres.style.display = "none";
      }
    } else if (key === "A") {
      limitVal = undefined;
      serial.write(key);
    } else if (key === "B") {
      limitVal = 0;
      serial.write(key);
    } else if (key === "C") {
      limitVal = 10;
      serial.write(key);
    } else if (key === "D") {
      limitVal = 60;
      serial.write(key);
    }
    // console.log(key);
    bg = loadImage(`images/${m}.jpg`);
    frameCount = 0;
}
