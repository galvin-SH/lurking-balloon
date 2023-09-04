const cityName="Mission Viejo";
const apiKey = config.key;

function getWeather(weatherapi){
    fetch(weatherapi)
    .then(function(weatherapi){
        console.log(weatherapi.json());
    });
}

getWeather(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);