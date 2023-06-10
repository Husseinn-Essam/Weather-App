import './styles/main.scss';
//import "@babel/polyfill";
const searchBtn = document.getElementById('search-btn');
const creds = document.querySelector(".creds");
searchBtn.addEventListener('click', () => {
    let location = document.getElementById('city-input').value;
    getWeather(location);
  });
  
  async function getWeather(location) {
    try {
      const weatherApiKey = 'fe5bf2fd65fc420ea3c175649230906';
      const pixabayApiKey = '33206537-0633c0c38beb775155d06f2a1';
      const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(location)}`;
      const response = await fetch(weatherUrl);
      const data = await response.json();
      console.log(data);
  
      // Extract the necessary data from the API response
      const weatherCondition = data.current.condition.text;
      const localDate = data.location.localtime.split(' ')[0];
      const localTime = data.location.localtime.split(' ')[1];
      const temperature = data.current.temp_c;
      const feelsLike = data.current.feelslike_c;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;
  
      // Update the DOM with the retrieved weather data
      document.querySelector('.location').textContent = data.location.name;
      document.querySelector('.state').textContent = weatherCondition;
      document.querySelector('.date').textContent = localDate;
      document.querySelector('.time').textContent = localTime;
      document.querySelector('.temperature .value').textContent = temperature;
      document.querySelector('.feels-like').textContent = `Feels Like: ${feelsLike}°C`;
      document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
      document.querySelector('.wind-speed').textContent = `Wind Speed: ${windSpeed} km/h`;
  
      // Get the background image based on weather condition from Pixabay API
      const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${weatherCondition} weather&image_type=photo&category=nature`;
      const pixabayResponse = await fetch(pixabayUrl);
      const pixabayData = await pixabayResponse.json();
      if (pixabayData.hits.length > 0) {
        const imageUrl = pixabayData.hits[0].largeImageURL;
        document.body.style.backgroundImage = `url(${imageUrl})`;
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  // Default call
  getWeather('London');
  


