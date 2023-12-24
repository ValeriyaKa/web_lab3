
function updateGraf(rValue) {

    // Устанавливаем координаты точек по оси Y
    ['Y1', 'R1'].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('y', 50 * 5 / rValue);
        el.textContent = rValue;
    });
    ['-X1', '-R'].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('x', 50 * 5/ rValue);
        el.textContent = rValue;

    });

    ['-Y1', '-R1/2'].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('y', ((285 - 200) * rValue/ 5) + 200);
        el.textContent = rValue/5;

    });
    [ '-Y2', '-R1' ].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('y', ((370 - 200) * rValue/ 5) + 200);
        el.textContent = rValue;

    });

    // Устанавливаем координаты точек по оси X
    ['-X2', '-R/2'].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('x', 200 - ((200 - 115) * rValue / 5));
        el.textContent = rValue / 2;

    });
    [ 'Y2','R1/2' ].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('y', 200 - ((200 - 125) * rValue/ 5));
        el.textContent = rValue/2;

    });

    ['X1', 'R/2'].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('x', ((285 - 200) * rValue / 3) + 200);
        el.textContent = rValue/2;


    });

    ['X2', 'R'].forEach(id => {
        const el = document.getElementById(id);
        el.setAttribute('x', ((370 - 200) * rValue / 5) + 200);
        el.textContent = rValue;


    });

    // Обновляем координаты фигур
    const circle = document.getElementById('circle');
    const startRadius = ((5 - rValue) / 0.5) * 12;
    circle.setAttribute('d', `M 200.5 200 L 200.5 ${120 + startRadius} A ${73+3*startRadius/12} ${73+3*startRadius/12} 0 0 1 ${285 - startRadius} 200 Z`);

    const square = document.getElementById('square');
    square.setAttribute('width', (85 / 5) * rValue);
    square.setAttribute('height', (170 / 5) * rValue);
    square.setAttribute('x', 200.5);
    square.setAttribute('y', 200.5);

    const triangle = document.getElementById('triangle');
    triangle.setAttribute('points', `${200 - (52 * rValue)},200 200,200 198,${205 + (55 * rValue)}`);


}


function loadAndDrawDots() {
    const table = document.getElementById("pointForm:resultTable");
    const svg = document.getElementById("mySVG");

    const oldDots = svg.querySelectorAll("circle");
    oldDots.forEach(dot => dot.parentNode.removeChild(dot));

    for (let i = 1; i < table.rows.length; ++i) {
        const cells = table.rows.item(i).cells;
        const xValue = parseFloat(cells.item(0).innerHTML.trim());
        const yValue = parseFloat(cells.item(1).innerHTML.trim());
        const isInside = cells.item(3).innerHTML.trim() === "true";

        drawPoints(xValue, yValue, isInside, svg);
    }
}

function drawPoints(x, y, isInside, svg) {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    let dotCoords = {
        x: x / rValue * 125 + 150, // Измените значения координат в соответствии с вашей логикой
        y: 150 - y / rValue * 125  // Измените значения координат в соответствии с вашей логикой
    };

    dot.setAttribute("r", "5");
    dot.setAttribute("cx", `${dotCoords.x}`);
    dot.setAttribute("cy", `${dotCoords.y}`);
    dot.setAttribute("fill", isInside ? "green" : "red");

    svg.appendChild(dot);
}


