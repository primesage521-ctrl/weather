
console.log("Weather app started");

const API_KEY = "c40165a19cfa95b5f3242430aff063ef";

const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const result = document.getElementById("weather-result");

async function getWeather(city) {
    result.textContent = "Loading weather...";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Weather request failed");
        }

        result.innerHTML = `
            <h2>${data.name}</h2>
            <h3>${Math.round(data.main.temp)}°C</h3>
            <p>${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        result.textContent = "Error: " + error.message;
        console.log(error);
    }
}

searchButton.addEventListener("click", function () {
    console.log("Search clicked!");

    const city = cityInput.value.trim();

    if (city === "") {
        result.textContent = "Please enter a city.";
        return;
    }

    getWeather(city);
});