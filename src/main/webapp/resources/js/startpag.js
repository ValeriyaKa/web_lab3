document.addEventListener("DOMContentLoaded", function () {

    function displayTime() {
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();

        // Добавляем ноль в начало, если число меньше 10
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;

        let display = hours + ":" + minutes + ":" + seconds;
        document.getElementById("clock").innerHTML = display;

        setTimeout(displayTime, 5000);
    }

    window.onload = function() {
        displayTime(); // Запускаем функцию отображения времени при загрузке страницы
    };

});