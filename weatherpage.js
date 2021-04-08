var searchFormEl = document.querySelector('#search-form');
var searchBtn = document.querySelector('.btn');
var todayPanel = document.querySelector('.today-panel')
var cities = [];
var searchInputValue = document.querySelector('#form-input').value;
var key = "40464402787ca1045c521f1a0c696abf";

// Time periods using moment
var time = function () {
    $("#currentDay").text(moment().format('MMM Do YYYY, h:mm:ss a'));
}
setInterval(time, 1000);


function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCitiesList();
}
init();


function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}

function renderCitiesList() {
    for (var i = 0; i < cities.length; i++) {
        var li = document.createElement("li");
        cities.appendChild(li);
    }
}
// When form is submitted 
$('#form-input').on('click', function (event) {

}
)
// Fetch formula to get API for today's weather (todayPanel)
function getTodayApi(e) {
    e.preventDefault();

    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchInputValue + '&appid=40464402787ca1045c521f1a0c696abf';
    cities.push(searchInputValue).value;
    storeCities();
    renderCitiesList();

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n--------------');
            console.log(data)
        })
}

searchBtn.addEventListener('click', getTodayApi);