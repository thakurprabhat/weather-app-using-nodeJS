const city_name = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city = document.getElementById("city");
const todaysDay = document.getElementById("todaysDay");
const todaysDate = document.getElementById("todaysDate");
const tempMode = document.getElementById("tempStatus");
const weatherStatusDiv = document.querySelector('.weather-status');

const getWeatherInfo = async (event) => {
    let today = new Date().toLocaleDateString();
    todaysDate.innerText = today;
    getDay();
    event.preventDefault();
    if (city_name.value == '') {
        city.innerText = "Please enter city name";
        weatherStatusDiv.style.display = 'none';
    } else {
        try {
            let yourCityName = city_name.value
            const api_key = "add621e12774cbe82a90b300493dcf66"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${yourCityName}&units=metric&appid=${api_key}`
            const response = await fetch(url);
            const data = await response.json();
            const temperatureTag = document.getElementById("temp");
            temperatureTag.innerText = data.main.temp;
            city.innerText = `${data.name}, ${data.sys.country}`;
            const tempStatus = data.weather[0].main;
            let tempModeClass; 
            switch (tempStatus) {
                case "Clear" : {
                    tempModeClass = "bi bi-brightness-high"; 
                    break;
                }
                case "Clouds" : {
                    tempModeClass = "bi bi-cloud"; 
                    break;
                }
                case "Rain" : {
                    tempModeClass = "bi bi-cloud-rain-heavy"; 
                    break;
                }
                case "Mist" : {
                    tempModeClass = "bi bi-cloud-sun-fill"; 
                    break;
                }
                default : {
                    tempModeClass = "bi bi-sun-fill"; 
                    break;
                }
            }
            tempMode.innerHTML = `<i class="${tempModeClass}"></i>`;
            weatherStatusDiv.style.display = 'flex';
        } catch {
            city.innerText = `Plz enter proper city name`;
        }
    }
}

const getDay = () => {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[new Date().getDay()];
    document.getElementById("todaysDay").innerText = r;
}
submitBtn.addEventListener('click', getWeatherInfo)
