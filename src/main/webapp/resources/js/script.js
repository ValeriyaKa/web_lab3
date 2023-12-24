document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pointForm");
    const selectElement = document.getElementById('pointForm:r');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const r = selectedOption.value;
    console.log(r);

    const RATIO_X = 50;
    const RATIO_Y = 50;
    const CENTER_X = 205;
    const CENTER_Y = 200;
    const graph = document.getElementById("graph-container");

    graph.addEventListener("click", function (event) {
        let xPixel = event.offsetX;
        let yPixel = event.offsetY;
        let x = ((xPixel - CENTER_X) / RATIO_X).toFixed(1);
        let y = ((CENTER_Y - yPixel) / RATIO_Y).toFixed(10);

        console.log("X:", x, "Y:", y);
        console.log("X:", xPixel, "Y:", yPixel);

        // Отправляем данные на сервер для валидации
        if (validate(x, y, r)) {
            sendRequestToBean(x, y, r);
            updateGraf(r);
            loadAndDrawDots();
        }
    });

    document.getElementById("checkButton").addEventListener("submit", function () {
        event.preventDefault();
        let x = parseFloat(form.elements["pointForm:x"].value);
        let y = parseFloat(form.elements["pointForm:y"].value);
        console.log(x, y)
        if (validate(x, y, r)) {
            // Отправляем данные на сервер для валидации
            sendRequestToBean(x, y, r);
            updateGraf(r);
            loadAndDrawDots();
        }
    });

    function sendRequestToBean(x, y, r) {
        // Вызываем удаленную команду PrimeFaces sendRequest с передачей параметров
        sendRequest([{ name: "x", value: x }, { name: "y", value: y }, { name: "r", value: r }]);
    }


    function validate(x, y, r) {
        return (x >= -3 && x <= 5) && (y >= -3 && y <= 5) && r !== null;
    }
});
