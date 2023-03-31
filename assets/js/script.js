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


var apiKey = 'b63352d7a434d5e352882d0272d386e4';

var formEl = document.querySelector('#city-search-form');
var cityNameEl = $('#city-name');
var submitButtonEl = $('submit-button');
var searchedCityEl = $('searchedCity');
var city;
var weather = [];
var citySearch = [];


function weatherDisplay (weather)
    $('#day-temp').text(weather[0].temperature);
    $('#day-wind').text(weather[0].wind);
    $('#day-humidity').text(weather[0].humidity);
    $('#searchedCity').text(city);
    for (var i = 0; i <= 5; i++) {
        
    }