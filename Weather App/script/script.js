const searchBtn = document.getElementById('search');
const container = document.getElementById('container');
const searchInput = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const degree = document.getElementById('degree');
const weather = document.getElementById('weather');
const place = document.getElementById('place');

async function getWeather() {
    try{
        const searchCity = searchInput.value;
        if(!searchCity){ console.log('Please enter a specific city'); return;}
        
        const myAPIKey = '110ee7a380f643eda9b62127262406';
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${myAPIKey}&q=${searchCity}`);
        const data = await res.json();

        const placeData = data.location.name;
        const degreeData = data.current.temp_c;
        const windData = data.current.wind_kph;
        const humidityData = data.current.humidity;
        const weatherData = data.current.condition.code
        const status = [1000].includes(weatherData) ? "sunny" :
            [1003, 1006, 1009, 1030].includes(weatherData) ? "cloudy" :
            [1087, 1273, 1276, 1282].includes(weatherData) ? "thunder" : 
            "rainy";
        
        const saveObj = {
            degreeData, windData, humidityData, weatherData, status, placeData
        };
        localStorage.setItem('weatherUpdate', JSON.stringify(saveObj));

        renderWeather(saveObj);
        console.log(data);

        searchInput.value = '';
    }catch(error){
        console.error(`Cannot get the data: ${error}`);
        alert('Cannot find the city. Please try again.');
    }
}

function renderWeather(data) {
    place.textContent = data.placeData;
    degree.textContent = `${data.degreeData}°c`;
    wind.textContent = `${data.windData}km/h`;
    humidity.textContent = `${data.humidityData}%`;
    weather.innerHTML = `<img src="../icon/${data.status}.png" alt="${data.status}" class="w-32 h-32 object-contain">`;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('weatherUpdate');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        renderWeather(parsedData);
    }
});

searchBtn.addEventListener('click', getWeather);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});