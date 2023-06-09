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

        let call = await fetch(`https://api.weatherapi.com/v1/current.json?key=e889b7a7331a49cb96d162507230706&q=${location}`);
        let data = await call.json();
        console.log(data);
    }
    
    catch{
        console.log("ERROR");
    }
}
