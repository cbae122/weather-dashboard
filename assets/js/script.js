// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

// `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`




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
        var symbolUrl = `https://openweathermap.org/img/wn/` + weatherSymbol +  `@2x.png`;
        var today = dayjs();
        var city = document.getElementById('currentCity');
        city.innerHTML = (data.name + '' + '(' + today.format('MM/DD/YYYY') + ')' + '<img src="' + symbolUrl + '">');
    })

}

formEl.addEventListener('submit', handleFormSubmit);

// submitButtonEl.on('click',showWeather);

// function showWeather(event) {
//     event.preventDefault();
//     if(citySearch.val().trim() !='') {
//         city = citySearch.val().trim();
//         searchedWeather(city);
//         console.log(event);

//         var searchedCityList = document.getElementById('searched-city-list');
//         searchedCityList.textContent = '';


//     }
// }

// function searchedWeather(city) {
//     var apiKey = 'b63352d7a434d5e352882d0272d386e4';
//     var url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

//     fetch(url)
//     .then(function (response) {
//         console.log(response);
//     })
// }
