import './styles/main.scss';
//import "@babel/polyfill";
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    let location = document.getElementById('city-input').value;
    getWeather(location);
  });
async function getWeather(location)
{
    try{

        let call = await fetch(`https://api.weatherapi.com/v1/current.json?key=fe5bf2fd65fc420ea3c175649230906&q=${location}`);
        let data = await call.json();
        console.log(data);
        const [localDate, localTime] = data.location.localtime.split(' ');
        console.log(data.location.localtime);
        console.log(data.location.name);
        // console.log(data.current.feelslike_c);
        // console.log(data.current.feelslike_f);
        // console.log(data.current.humidity);
        // console.log(data.current.temp_c);
        // console.log(data.current.temp_f);
        // console.log(data.current.wind_kph);
        // console.log(data.current.condition.text);
        // console.log(data.current.condition.icon);
        document.querySelector('.location').textContent = data.location.name;
        document.querySelector('.state').textContent = data.current.condition.text;
        document.querySelector('.date').textContent = localDate ;
        document.querySelector('.time').textContent = localTime
        document.querySelector('.temperature .value').textContent = data.current.temp_c;
        document.querySelector('.feels-like').textContent = `Feels Like: ${data.current.feelslike_c}°C`;
        document.querySelector('.humidity').textContent = `Humidity: ${data.current.humidity}%`;
        document.querySelector('.wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;



    }
    
    catch{
        console.log("ERROR");
    }
}
