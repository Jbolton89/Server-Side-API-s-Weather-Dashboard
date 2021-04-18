var forminputEl = document.querySelector('#form-input');
var searchBtn = document.querySelector('.btn');
var todayPanel = document.querySelector('.today-panel');
var pastCities = document.getElementById('list-group');
var cities = [];
var cardTitleEl = document.getElementById('card-title')
var todayTemp = document.querySelector(".temperature");
var todayWind = document.querySelector(".windspeed");
var todayHumidity = document.querySelector(".humidity");
var todayUv = document.querySelector(".uvindex");
var todayIcon = document.getElementById("icon")
var form = document.querySelector('form');


var apiKey = "40464402787ca1045c521f1a0c696abf";

var handleErrors = function(response) { 
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;

}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("pastCities"));
    if (storedCities !== null) {
        cities = pastCities;
    }
    renderCitiesList();
}




init();








form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    var cityName = forminputEl.value.trim(); 
    if (cityName === "") {
        return;
    } else {
        cities.push(cityName); 
        localStorage.setItem("city-list",JSON.stringify(cities));
        renderCitiesList();
        getLocation(cityName); 
    }
});

function renderCitiesList() {
    for (var i = 0; i < cities.length; i++) {
        var li = document.createElement("li");
        pastCities.appendChild(li);
        li.innerHTML = li.innerHTML + pastCities[i];
        li.setAttribute("data-search", pastCities[i]);
        li.setAttribute(
          "class",
          "list-group-item bg-dark text-white"
        );
    
    }
}
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




function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}


// // When form is submitted 
// $('#form-input').on('click', function (event) {

// }
// )


// Function to retriveve latitude an longitude 
var getLocation = function (cityName) {
    var requestURL = 
    "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + 
    "&limit=1&appid=40464402787ca1045c521f1a0c696abf";
    fetch(requestURL.then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var long = data[0].lon;
                var lat = data[0].lat;
                getWeather(lat, long, cityName);
                console.log(data)
            });
        } else {
            alert("Error: " + response.statusText);
        }
    }));
};
 







// Fetch formula to get API for today's weather (todayPanel)
// function getTodayApi(e) {
//     e.preventDefault();
//     var searchInputValue = document.querySelector('#form-input').value;
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputValue + '&appid=40464402787ca1045c521f1a0c696abf';
//     cities.push(searchInputValue).value;
//     pastCities();
//     renderCitiesList();

//     fetch(apiUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log('Fetch Response \n--------------');
//             console.log(data)
//             for (var i = 0; i < data.length; i++){
//                 var listItem = document.createElement('li');
//                 listItem.textContent = data[i].value;
//                 pastCities.appendChild(listItem);
//                 }
    
//         });
// }

// searchBtn.addEventListener('click', getTodayApi);