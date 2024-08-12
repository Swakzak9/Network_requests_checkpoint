document.addEventListener('DOMContentLoaded', () => {
    const apikey = "0084b59869f98e4c67f4a762a6882e28";
    const getWeather = document.getElementById('getWeather');
    const searchButton = document.getElementById('searchButton');
    const weatherDiv = document.getElementById('weather');

    searchButton.addEventListener('click', () => {
        const city = getWeather.value;
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather not available");
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                weatherDiv.textContent = 'Error fetching weather data';
            });
    }

    function displayWeather(data) {
        const { main, name, weather } = data;
        weatherDiv.innerHTML = `
            <h2>${name}</h2>
            <p>${weather[0].description}</p>
            <p>${main.temp}°C</p>
        `;
    }
});