const intro = document.getElementById("intro");
// const mask = document.getElementById("mask");
const modal = document.getElementById("modal");
const modal_content = document.getElementById("modal_content");
const camera = document.getElementById("camera");
const locationInfo = document.getElementById("location");
const nycInfo = document.getElementById("nyc_info");
const nyc = document.getElementById("nyc");

let timeInterval;

window.addEventListener("mousemove", () => {
  intro.style.display = "none";

  if (timeInterval) {
    clearInterval(timeInterval);
  }
  timeInterval = setTimeout(() => {
    intro.style.display = "block";
  }, 1000 * 10)
});

locationInfo.addEventListener("click", () => {
  if (!modal.style.display || modal.style.display === "none") {
    renderLocations();
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
});

nyc.addEventListener("click", () => {
  nycInfo.style.display = "flex"
});

nycInfo.addEventListener("click", () => {
  nycInfo.style.display = "none";
});

function deleteLocation(e) {
  e.stopPropagation();
  const name = e.target.dataset.name;
  const findLocation = Object.values(data).find(item => item.NAME === name);
  if (findLocation) {
    findLocation.isDelete = !findLocation.isDelete;
    if (findLocation.isDelete) {
      filterLocations.push(name);
    } else {
      filterLocations = filterLocations.filter(item => item !== name);
    }
    renderLocations();
  }
}

let sort = 1;

function sortLocations(e) {
  e.stopPropagation();
   if (sort === 1) {
    sort = -1;
  } else {
    sort = 1;
  }
  renderLocations();
}

function renderLocations () {
  modal_content.innerHTML = `
    <li>
    <span class="area-header">Area<img src="images/sort.png" alt="Sort" class="sort-icon" onclick="sortLocations(event)" /></span>
    <span style='width: 300px;font-weight: bold;font-size: 20px'>Name</span>
    <span style='font-weight: bold;font-size: 20px'>Location</span>
    </li>
  `;
  const filterData = Object.values(data).filter(item => item[`${m}-f${m}`]);
  if (sort === 1) {
    filterData.sort((a, b) => +a.ACRES - +b.ACRES);
  }
  if (sort === -1) {
    filterData.sort((a, b) => +b.ACRES - +a.ACRES);
  }
  filterData.forEach(item => {
    modal_content.innerHTML += `
      <li class="${item.isDelete ? "delete": ""}">
         <img src="${item.isDelete ? "images/cancel.png" : "images/delete.png"}" alt="Delete" class="delete-icon" data-name="${item.NAME}" onclick="deleteLocation(event)" />
        <span style="width: 200px">${item.ACRES}</span>
        <span style="width: 300px">${item.NAME}</span>
        <span>${item.LOCATION}</span>
      </li>
    `
  });
}

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

camera.addEventListener("click", () => {
  html2canvas(document.body).then((canvas) => {
    const base64image = canvas.toDataURL("image/png");
    const download = document.createElement('a');
    download.href = base64image;
    download.download = "flower.png";
    download.click();
  });
});


