const apiKey = config.key;
const searchFormEl = document.querySelector("#search-form");
const inputEl = document.querySelector("#city-search");
const buttonListEl = document.querySelector("#button-list");

function formSubmitHandler(event) {
    event.preventDefault();
    let search = inputEl.value.trim(); //removes trailing whitespace from user input
    if (search != "") {
        historyButton(search); //updates history button list with most recent search
        getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`); //returns current weather object
        getForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`); //returns 5 day forecast object
        inputEl.value = "";
    }
    localStorage.setItem("city",JSON.stringify(search));
}

//This will assign values from the returned current weather object to the elements under current conditions in the html file
function getWeather(weatherapi) {
    fetch(weatherapi)
        .then(function (weatherapi) {
            let date = document.querySelector("#current-date");
            let icon = document.querySelector("#current-icon");
            let temp = document.querySelector("#current-temp");
            let wind = document.querySelector("#current-wind");
            let humid = document.querySelector("#current-humid");
            weatherapi.json().then(function (data) {
                newDate = new Date(data.dt * 1000);
                date.textContent = newDate.toString();
                icon.src = setIcon(data.weather[0].icon);
                temp.textContent = "Temperature: " + data.main.temp + "\xB0" + "C";
                wind.textContent = "Wind Speed: " + data.wind.speed + " km/h";
                humid.textContent = "Humidity: " + data.main.humidity + "%";
            });
        });
}

//This will dynamically generate the next 5 days forecast cards and assign their values from the returned forecast object
function getForecast(weatherapi) {
    fetch(weatherapi)
        .then(function (weatherapi) {
            weatherapi.json().then(function (data) {
                let forecast = document.querySelector("#forecast-container");
                forecast.innerHTML = "";
                for (i = 0; i < data.list.length; i++) {
                    let currentForecast = data.list[i].dt_txt;
                    if (currentForecast.slice(11, 13) == 12) {
                        let card = document.createElement("card");
                        let cardBody = document.createElement("div");
                        let cardDate = document.createElement("h4");
                        let cardIcon = document.createElement("img");
                        let cardTemp = document.createElement("h4");
                        let cardWind = document.createElement("h4");
                        let cardHumid = document.createElement("h4");
                        card.classList.add("card", "bg-color-2", "border-3", "m-2", "border-color-1", "flex-fill");
                        cardBody.classList.add("card-body");
                        cardDate.classList.add("card-title", "text-center");
                        cardIcon.classList.add("card-heading");
                        cardTemp.classList.add("card-heading");
                        cardWind.classList.add("card-heading");
                        cardHumid.classList.add("card-heading");
                        cardDate.textContent = data.list[i].dt_txt.slice(5, 10);
                        cardIcon.src = setIcon(data.list[i].weather[0].icon);
                        cardTemp.textContent = "🌡️" + data.list[i].main.temp + "\xB0" + "C";
                        cardWind.textContent = "🌪️" + data.list[i].wind.speed + " km/h";
                        cardHumid.textContent = "💦" + data.list[i].main.humidity + "%";
                        cardBody.append(cardDate, cardIcon, cardTemp, cardWind, cardHumid);
                        card.append(cardBody);
                        forecast.append(card);
                    }
                }
            });
        });
}

//retrieves an image according to the code supplied from the api returned object
function setIcon(code) {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

function historyButton(city) {
    let button = document.createElement("button");
    button.textContent = city;
    button.setAttribute("class", "bg-color-3 btn-lg m-2 past-search");
    button.setAttribute("id", city)
    buttonListEl.appendChild(button);
}

function localButtons(event) {
    let oldButtons = JSON.parse(localStorage.getItem("city"));
    console.log(event.target.textContent)
    oldButtons.push(event.target.textContent);
    localStorage.setItem("city",JSON.stringify(oldButtons));
}

// function getLocal(){
//     if (JSON.parse(localStorage.getItem("city")).length != 0){
//         for(i=0;i<JSON.parse(localStorage.getItem("city")).length;i++){

//         }
//     }
// }

buttonListEl.addEventListener("click", localButtons);
searchFormEl.addEventListener("submit", formSubmitHandler);