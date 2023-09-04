const cityName="Mission Viejo";
const apiKey = config.key;

function getForecast(weatherapi){
    fetch(weatherapi)
    .then(function(weatherapi){
        console.log(weatherapi.json());
    });
}

getForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);