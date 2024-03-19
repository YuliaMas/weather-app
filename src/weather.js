function showTemperatureCity(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#weatherIcon");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src=${response.data.condition.icon_url} alt=${response.data.condition.icon}>`;
}

function searchCity(city) {
    let keyApi = "fc9fafc603f34bc9td52410a3aacdbbo";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${keyApi}&units=metric`;
    axios.get(apiUrl).then(showTemperatureCity);
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    searchCity(searchInputElement.value);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function displayForcast() {
    let days = ["Sun", "Mon", "Tue", 'Wed', 'Thu'];
    let icons = ["🌦️", "⛈️", "🌞", "⛅", "🌞"];
    let tempMax = [12, 14, 20, 18, 21];
    let tempMin = [8, 10, 14, 12, 15];
    let forcastHtml = "";

    days.forEach((day, index) => {
        forcastHtml += `
        <div class="weather-forcast-day">
            <div class="weather-forcast-date">${day}</div>
            <div class="weather-forcast-icon">${icons[index]}</div>
            <div class="weather-forcast-temperatures">
                <span class="weather-forcast-temperature-max">
                     <strong>${tempMax[index]}°</strong>
                </span>
                <span class="weather-forcast-temperature-min">${tempMin[index]}°</span>
            </div>
        </div>
        `;
    });

    let forcastElement = document.querySelector("#forcast");
    forcastElement.innerHTML = forcastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Lviv");
displayForcast();