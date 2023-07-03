import "./styles/main.scss";
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  let location = document.getElementById("city-input").value;
  getWeather(location);
});

async function getWeather(location) {
  try {
    const weatherData = await fetchWeatherData(location);

    const {
      weatherCondition,
      localDate,
      localTime,
      temperature,
      feelsLike,
      humidity,
      windSpeed,
    } = extractWeatherData(weatherData);

    updateWeatherInfo(
      weatherData.location.name,
      weatherCondition,
      localDate,
      localTime,
      temperature,
      feelsLike,
      humidity,
      windSpeed
    );

    const imageUrl = await fetchBackgroundImage(weatherCondition);
    if (imageUrl) {
      document.body.style.backgroundImage = `url(${imageUrl})`;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

async function fetchWeatherData(location) {
  const weatherApiKey = "e69de3b98c1843d2bc683301232906";
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(
    location
  )}`;
  const response = await fetch(weatherUrl);
  return response.json();
}

function extractWeatherData(weatherData) {
  const weatherCondition = weatherData.current.condition.text;
  const localDate = weatherData.location.localtime.split(" ")[0];
  const localTime = weatherData.location.localtime.split(" ")[1];
  const temperature = weatherData.current.temp_c;
  const feelsLike = weatherData.current.feelslike_c;
  const humidity = weatherData.current.humidity;
  const windSpeed = weatherData.current.wind_kph;

  return {
    weatherCondition,
    localDate,
    localTime,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
  };
}

function updateWeatherInfo(
  location,
  weatherCondition,
  localDate,
  localTime,
  temperature,
  feelsLike,
  humidity,
  windSpeed
) {
  document.querySelector(".location").textContent = location;
  document.querySelector(".state").textContent = weatherCondition;
  document.querySelector(".date").textContent = localDate;
  document.querySelector(".time").textContent = localTime;
  document.querySelector(".temperature .value").textContent = temperature;
  document.querySelector(
    ".feels-like"
  ).textContent = `Feels Like: ${feelsLike}°C`;
  document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
  document.querySelector(
    ".wind-speed"
  ).textContent = `Wind Speed: ${windSpeed} km/h`;
}

async function fetchBackgroundImage(weatherCondition) {
  const pixabayApiKey = "33206537-0633c0c38beb775155d06f2a1";
  const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(
    `${weatherCondition} weather`
  )}&image_type=photo&category=nature`;
  const response = await fetch(pixabayUrl);
  const data = await response.json();

  if (data.hits.length > 0) {
    return data.hits[0].largeImageURL;
  }
  return null;
}

// Default call
getWeather("Cairo");
