var searchFormEl = document.querySelector('#search-form');
var searchBtn = document.querySelector('.btn');
var todayPanel = document.querySelector('.today-panel')
var pastCities = document.getElementById('list-group')
var cities = [];
var searchInputValue = document.querySelector('#form-input').value;
var apiKey = "40464402787ca1045c521f1a0c696abf";

// var formSubmitHandler = function(e){
//     e.preventDefault();
//     var city = SearchInputValue.value.trim();
//     if(city){
//         // change getCityWeather and get5Day to different
//         getCityWeather(city);
//         get5Day(city);
//         cities.unshift({city});
//         searchInputValue.value = "";
//     } else {
//         alert("You will need to Enter a valid city")
//     }
//     saveSearch(); 
// }




// var saveSearch = function(){
//     localStorage.setItem("cities", JSON.stringify(cities));
// 

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
        pastCities.appendChild(li);
    }
}
// When form is submitted 
$('#form-input').on('click', function (event) {

}
)
// Fetch formula to get API for today's weather (todayPanel)
function getTodayApi(e) {
    e.preventDefault();
    var apiUrl = 'api.openweathermap.org/data/2.5/weather?q=' + searchInputValue + '&appid=40464402787ca1045c521f1a0c696abf';
    cities.push(searchInputValue).value;
    storeCities();
    renderCitiesList();

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n--------------');
            console.log(data)
            for (var i = 0; i < data.length; i++){
                var listItem = document.createElement('li');
                listItem.textContent = data[i].value;
                pastCities.appendChild(listItem);
                }
    
        });
}

searchBtn.addEventListener('click', getTodayApi);