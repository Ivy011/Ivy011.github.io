let data, url;
let p1;

function preload(){
  url = "film.json";
  data = loadJSON(url)

}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  itemNum = Object.keys(data);

  for (let i = 0; i< itemNum.length; i++){
    let latitudes = data[i].Latitude;
    let longitudes = data[i].Longitude;

    let yCoords = map(latitudes, 22.99, 37.53, 0, 500);
    let xCoords = map(longitudes, -121.74, -92.96, 0, 500);

    ellipse(xCoords, yCoords, 10, 10);
    if (p1) {
      line(p1.x, p1.y, xCoords, yCoords);
    }
    p1 = { x: xCoords, y: yCoords }
  }
}
