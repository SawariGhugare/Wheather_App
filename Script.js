

const apikey = "6e54e756cb34b2e9c8587e7d8c94a02f";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-icon");
const weatherIcon = document.querySelector(".weather-icon");
const closeBtn = document.querySelector('.btn-close');


async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch weather data.");
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".Pressure").innerHTML = data.main.pressure + "";

        const formatTime = (timestamp) => {
const timeInMilliseconds = timestamp * 1000; // Convert to milliseconds
const date = new Date(timeInMilliseconds);
const hours = date.getHours();
const minutes = date.getMinutes();
return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

document.querySelector(".sunrise").innerHTML = formatTime(data.sys.sunrise);
document.querySelector(".sunset").innerHTML = formatTime(data.sys.sunset);

        if (weatherIcon) {
            if (data.weather && data.weather.length > 0) {
                const weatherMain = data.weather[0].main;
                if (weatherMain === "Clouds") {
                    weatherIcon.src = "images/clouds.png";
                } else if (weatherMain === "Clear") {
                    weatherIcon.src = "images/clear.png";
                } else if (weatherMain === "Rain") {
                    weatherIcon.src = "images/rain.png";
                } else if (weatherMain === "Drizzle") {
                    weatherIcon.src = "images/drizzle.png";
                } else if (weatherMain === "Haze") {
                    weatherIcon.src = "images/haze.png";
                } else if (weatherMain === "Smoke") {
                    weatherIcon.src = "images/mist.png";
                } else {
                    console.error("Unknown weather condition.");
                }
            } else {
                console.error("Weather data not available.");
            }

            document.querySelector(".weather").style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('input', function () {
    if (searchBox.value.trim() === '') {
        closeBtn.disabled = true;
    } else {
        closeBtn.disabled = false;
    }
});

closeBtn.addEventListener('click', function () {
    searchBox.value = ''; // Clear the search box
    closeBtn.disabled = true;
});

