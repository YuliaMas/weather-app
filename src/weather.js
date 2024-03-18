function showTemperatureCity(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current)
    temperatureElement.innerHTML = temperature;
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;
    let keyApi = "fc9fafc603f34bc9td52410a3aacdbbo";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${keyApi}&units=metric`;
    axios.get(apiUrl).then(showTemperatureCity);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let changeFormatDay = days[day];
    return `${changeFormatDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
