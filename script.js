document.getElementById('getWeather').addEventListener('click', function () {
    const city = document.getElementById('city').value;
    const apiKey = '31dd2edb630ac691918d648e56392659';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weatherCondition').textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Extract icon code and weather condition
            const iconCode = data.weather[0].icon;
            const weatherCondition = data.weather[0].main.toLowerCase(); // e.g., "clear", "clouds", "rain"

            let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weatherIcon').src = iconUrl;
        })
        .catch(error => console.error('Error fetching data:', error));
});
