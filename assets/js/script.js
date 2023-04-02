var today = dayjs();
var todaysDate = (today.format('MM/DD/YYYY'));
var citySearched = [];
var citySearchEl = $('#searchedCity');
var searchedCityName;
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
            if (citySearched.includes(data.name) === false) {
                citySearched.push(data.name);
                localStorage.setItem('city', JSON.stringify(citySearched));
            }

            displaySearchedCities();

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

function displaySearchedCities () {
    if (localStorage.getItem('city')) {
        citySearched = JSON.parse(localStorage.getItem('city'));
    }

    var citySearchEl = document.getElementById('searchedCity');

    citySearchEl.innerHTML = '';

    for (var i = 0; i < citySearched.length; i++) {
        var searchedCityBtn = document.createElement('button');
        searchedCityBtn.classList.add('btn', 'btn-primary', 'my-2');
        searchedCityBtn.setAttribute('style', 'width: 100%');
        searchedCityBtn.textContent = `${citySearched[i]}`;
        citySearchEl.appendChild(searchedCityBtn);
    }

    var cityListBtn = document.querySelectorAll('.my-2');
    for (var i = 0; i < cityListBtn.length; i++) {
        cityListBtn[i].addEventListener('click', function () {
            firstApi(this.textContent);
        });
    }
};

displaySearchedCities();

formEl.addEventListener('submit', handleFormSubmit);
