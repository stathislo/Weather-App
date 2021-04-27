const api = {
    key:"b0b12a321cc5fc347705e7569ca95a64",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuerry);

function setQuerry (evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (value) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    
    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    if (weather.weather[0].main == 'Sunny'){
        return document.body.style.backgroundImage="url(./images/firewatch.jpg)"
      } if (weather.weather[0].main == 'Clouds') {
        return document.body.style.backgroundImage="url(./images/clouds.jpg)"
      } if (weather.weather[0].main == 'Clear') {
        return document.body.style.backgroundImage="url(./images/clear.jpg)"
      } if (weather.weather[0].main == 'Rain') {
        return document.body.style.backgroundImage="url(./images/rain.jpg)"
      } 
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
