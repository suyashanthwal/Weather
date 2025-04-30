document.addEventListener('DOMContentLoaded', function () {
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDiv = document.getElementById('weather');
    const getWeatherBtn = document.getElementById('getWeather');
    const cityInput = document.getElementById('city');

    weatherIcon.style.display = 'none';
    weatherIcon.classList.remove('show');
    weatherDiv.classList.remove('show');

    getWeatherBtn.addEventListener('click', function () {
        const city = cityInput.value.trim();
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const apiKey = '31dd2edb630ac691918d648e56392659';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        weatherIcon.style.display = 'none';
        weatherIcon.classList.remove('show');
        weatherIcon.src = '';
        weatherDiv.classList.remove('show');
        weatherDiv.classList.add('show');
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('City not found');
                return response.json();
            })
            .then(data => {
                document.getElementById('weatherCondition').textContent = `Weather: ${data.weather[0].description}`;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

                const iconCode = data.weather[0].icon;

                if (iconCode === "01d") {
                    weatherIcon.src = "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-day-sunny.svg";
                    weatherIcon.classList.add("animated-icon");
                } else {
                    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
                    weatherIcon.classList.remove("animated-icon");
                }
                
                weatherIcon.onload = function() {
                    weatherIcon.style.display = 'block';
                    weatherIcon.classList.add('show');
                };
                weatherIcon.onerror = function() {
                    weatherIcon.style.display = 'none';
                    weatherIcon.classList.remove('show');
                };

                setTimeout(() => weatherDiv.classList.add('show'), 200);
            })
            .catch(error => {
                alert('Could not fetch weather data. Please check the city name and try again.');
                weatherIcon.style.display = 'none';
                weatherIcon.classList.remove('show');
                weatherDiv.classList.remove('show');
            });
    });
});
