var forminputEl = document.querySelector('#form-input');
var searchBtn = document.querySelector('.btn');
var todayPanel = document.querySelector('.today-panel');
var pastCities = document.querySelector('.list-group');
var cities = [];
var todayTemp = document.querySelector("#temperature");
var todayWind = document.querySelector("#windspeed");
var todayHumidity = document.querySelector("#humidity");
var todayUv = document.querySelector("#uvindex");
var todayIcon = document.querySelector(".icon")
var form = document.querySelector('form');
var CityTitle = document.getElementById('card-title');
var fivedayBodyEl = document.querySelectorAll('.fiveday-text')
var fivedayEl = document.querySelectorAll('.fiveday-card');
var fivedayTitleEl = document.querySelectorAll(".fiveday-card-title")
var todayCardTitleEl = document.querySelector(".card-title-today")

function time() {
    $("#currentDay").text(moment().format('MMM Do YYYY, h:mm:ss a'));
}
setInterval(time, 1000);

var handleErrors = function(response) { 
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("list-group"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCitiesList();
    }













form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    var cityName = forminputEl.value.trim(); 
    if (cityName === "") {
        return;
    } else {
        cities.push(cityName); 
        localStorage.setItem("list-group",JSON.stringify(cities));
        renderCitiesList();
        getLocation(cityName); 
        console.log(localStorage);
    }
});

function renderCitiesList() {
    pastCities.innerHTML = "";
    for (var i = 0; i < cities.length; i++) {
        var li = document.createElement("li");
        li.textContent = cities[i];
        pastCities.appendChild(li);
        li.setAttribute(
          "class",
          "list-group-item bg-warning text-white justify-content-center"
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





// function storeCities() {
//     localStorage.setItem("cities", JSON.stringify(cities));
//     console.log(localStorage);
// }


// // When form is submitted 
// $('#form-input').on('click', function (event) {

// }
// )


// Function to retriveve latitude an longitude 
var getLocation = function (cityName) {
    var requestURL = 
    "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + 
    "&limit=1&appid=40464402787ca1045c521f1a0c696abf";
    fetch(requestURL).then(function (response) {
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
    });
};

var getWeather = function (lat,long, cityName) {
    var weatherURL = 
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&appid=40464402787ca1045c521f1a0c696abf"; 
    fetch(weatherURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) { 
                var currentDate = data.current.dt; 
                todayCardTitleEl.innerHTML = 
                    cityName + " " + moment(currentDate, "X").format("(DD/MM/YYYY)") + "(Today)"; 
                    todayIcon.src = "https://openweathermap.org/img/wn/" +
                    data.daily[0].weather[0].icon +
                    "@2x.png";
                    console.log(todayIcon);
                    todayTemp.textContent = "Temp: " + data.current.temp + "C";
                    todayWind.textContent = "Wind: " + data.current.wind_speed + "km/h";
                    todayHumidity.textContent = "Humidity: " + data.current.humidity + " %"; 
                    todayUv.textcontent = "UV Index: " + data.current.uvi; 
                    if (data.current.uvi <= 3) { 
                        todayUv.setAttribute("class", "px-4 bg-success")
                    } else if (data.current.uvi <= 7 && data.current.uvi >= 4) { 
                        todayUv.setAttribute("class", "px-4 bg-warning"); 
                    } else { 
                        todayUv.setAttribute("class", "px-4 bg-danger");
                    }

                    for (var i = 0; i < fivedayEl.length; i++) {
                        fivedayBodyEl[i].innerHTML = "";
                        var date = data.daily[i + 1].dt; 
                        fivedayTitleEl[i].innerHTML = moment(date, "X").format("DD/MM/YYY"); 
                        var fiveIcon = document.createElement("img"); 
                        var fiveTemp = document.createElement("p");
                        var fiveWind = document.createElement("p"); 
                        var fiveHumidity = document.createElement("p"); 
                        fiveIcon.src = "https://openweathermap.org/img/wn/" +
                        data.daily[i + 1].weather[0].icon +
                        "@2x.png";
                        fiveTemp.innerHTML = "Temp: " + data.daily[i + 1].temp.day + " C"; 
                        fiveWind.innerHTML = "Wind: " + data.daily[i + 1].wind_speed + " km/h"; 
                        fiveHumidity.innerHTML = "Humidity: " + data.daily[i + 1].humidity + " %"; 
                        fivedayBodyEl[i].appendChild(fiveIcon); 
                        fivedayBodyEl[i].appendChild(fiveTemp); 
                        fivedayBodyEl[i].appendChild(fiveWind); 
                        fivedayBodyEl[i].appendChild(fiveHumidity);
                    }
                });
        } else {alert("Error " + response.statusText); 
    }
    });
};
 
init();







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