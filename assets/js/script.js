// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var today = dayjs();
var todaysDate = (today.format('MM/DD/YYYY'));
var city = '';
var citySearch = $('#city-name');
var submitButtonEl = $('submit-button');
var formEl = document.querySelector('#city-search-form');
var formInputEl = document.querySelector('#city-name');
var apiKey = 'b63352d7a434d5e352882d0272d386e4';

function handleFormSubmit(event) {
    event.preventDefault();
    firstApi();
};


function firstApi(query) {
    var formInputValue = formInputEl.value;
    console.log('user input: ' + formInputValue);

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${formInputValue}&units=imperial`;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var weatherSymbol = data.weather[0].icon;
            var symbolUrl = `https://openweathermap.org/img/wn/` + weatherSymbol + `@2x.png`;
            var today = dayjs();
            var city = document.getElementById('currentCity');
            city.innerHTML = (data.name + '' + '(' + today.format('MM/DD/YYYY') + ')' + '<img src="' + symbolUrl + '">');

            var temperature = document.getElementById('temperature');
            temperature.textContent = 'Temperature: ' + data.main.temp + ' °F';

            var humidity = document.getElementById('humidity');
            humidity.textContent = 'Humidity: ' + data.main.humidity + ' %';

            var wind = document.getElementById('wind-speed');
            wind.textContent = 'Wind-Speed: ' + data.wind.speed + ' MPH';

            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log('lat: ' + lat + ' lon:' + lon);
            secondApi(lat, lon);
        })
};

function secondApi(lat, lon) {

    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataForecast) {
            console.log(dataForecast);
            // $('#fiveDayForecast').empty();

            for (var i = 0; i < 7; i++) {
                var cities = document.getElementById('fiveFayForecast');
                var timing = dataForecast.daily[i].dt;
                var dates = new Date(timing * 1000);
                var forecastDays = dayjs(dates).format('MM/DD/YYYY');
                var weatherSymbols = dataForecast.daily[i].weather[0].icon;
                var symbolsUrl = `https://openweathermap.org/img/wn/` + weatherSymbols + `@2x.png`;

                cities.innerHTML = (dataForecast.name + '' + '(' + forecastDays + ')' + '<img src="' + symbolsUrl + '">');

                var temperatures = document.getElementById('temperatures');
                temperatures.textContent = 'Temperature: ' + dataForecast.daily[i].temp.day + ' °F';

                var humiditys = document.getElementById('humiditys');
                humiditys.textContent = 'Humidity: ' + dataForecast.daily[i].humidity + ' %';

                var winds = document.getElementById('wind-speeds');
                winds.textContent = 'Wind-Speed: ' + dataForecast.daily[i].wind.speed + ' MPH';

            };
        });
};

formEl.addEventListener('submit', handleFormSubmit);
