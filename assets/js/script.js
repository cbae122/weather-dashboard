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

    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly&exclude=current&exclude=minutely&exclude=alerts&units=imperial&appid=${apiKey}`;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataForecast) {
            console.log(dataForecast);

            $('#fiveDayForecast').empty();

            for (var i = 7; i <= dataForecast.list.length; i += 8) {
                // for (var i = 7; i <= dataForecast.list.length; i += 8) {

                var forecastFiveDays = document.getElementById('fiveDayForecast');

                var unix_timestamp = dataForecast.list[i].dt_txt;
                var date = new Date(unix_timestamp);
                var forecastDate = dayjs(date).format('MM/DD/YYYY');

                // dynamically adding to html
                var div1 = document.createElement('div');
                div1.setAttribute('class', 'col-sm');
                forecastFiveDays.appendChild(div1);

                var div2 = document.createElement('div');
                div2.setAttribute('class', 'card card-body bg-primary border-dark')
                div1.appendChild(div2);

                var ptag1 = document.createElement('p');
                ptag1.textContent = forecastDate
                div2.appendChild(ptag1);

                var img2 = document.createElement('img');
                img2.setAttribute('src', 'https://openweathermap.org/img/wn/' + dataForecast.list[i].weather[0].icon + '@2x.png');
                img2.setAttribute('alt', dataForecast.list[i].weather[0].description);
                div2.appendChild(img2);

                var forecastTemp = dataForecast.list[i].main.temp;
                var ptag2 = document.createElement('p');
                div2.appendChild(ptag2);
                ptag2.textContent = 'Temp:' + forecastTemp + ' °F';

                var forecastHumidity = dataForecast.list[i].main.humidity;
                var ptag3 = document.createElement('p');
                div2.appendChild(ptag3);
                ptag3.textContent = 'Humidity:' + forecastHumidity + ' %';

                var forecastWindSpeed = dataForecast.list[i].wind.speed;
                var ptag4 = document.createElement('p');
                div2.appendChild(ptag4);
                ptag4.textContent = 'Wind-Speed:' + forecastWindSpeed + ' MPH';
            };
        });
};

formEl.addEventListener('submit', handleFormSubmit);
