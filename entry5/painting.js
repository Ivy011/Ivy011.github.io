const dragData = []

document.querySelectorAll('.col').forEach(function(col) {
    col.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData("text", event.target.id);
    });
});

document.querySelectorAll('.table-col').forEach(function(col) {
    col.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    col.addEventListener('drop', function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        if (
            ('BRY'.includes(data) && dragData.every(item => !'BRY'.includes(item))) ||
            ('dls'.includes(data) && dragData.every(item => !'dls'.includes(item)))
        ) {
            event.target.appendChild(document.getElementById(data));
            dragData.push(data)
        }
    });
});

document.getElementById('submit').addEventListener('click', function () {
    if (dragData.length === 2) {
        const img = document.createElement('img');
        img.width = 500;
        img.height = 500;
        img.src = './imgs/' + dragData.sort().join('') + '.jpg';
        const result = document.getElementById('result')
        result.appendChild(img);
        result.style.display = 'flex';
        document.getElementById('container').style.display = 'none';
    }
});
