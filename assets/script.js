const apiKey = config.key;
const searchFormEl = document.querySelector("#search-form");
const inputEl = document.querySelector("#city-search");
const buttonListEl = document.querySelector("#button-list")

function formSubmitHandler(event){
    event.preventDefault();
    let search = inputEl.value.trim();
    console.log(search);
    historyButton(search);
    getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
    getForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`)
}

function getWeather(weatherapi){
    fetch(weatherapi)
    .then(function(weatherapi){
        console.log(weatherapi.json());
    })
}

function getForecast(weatherapi){
    fetch(weatherapi)
    .then(function(weatherapi){
        console.log(weatherapi.json());
    });
}

function historyButton(city){
    let button = document.createElement("button");
    button.textContent = city;
    button.setAttribute("class","bg-color-3 btn-lg m-2");
    button.setAttribute("id","past-search");
    buttonListEl.appendChild(button);
}

searchFormEl.addEventListener("submit",formSubmitHandler);