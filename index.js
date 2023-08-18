const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'd2c41c8cc68e26c39bbca483f5232ca7';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return; 
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=pt_br`).then(response => response.json()).then(json => {
        
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        const sunriseTimestamp = json.sys.sunrise * 1000; // Convertendo para milissegundos
        const sunsetTimestamp = json.sys.sunset * 1000;   // Convertendo para milissegundos
        const currentTimestamp = Date.now();

        const isDaytime = currentTimestamp > sunriseTimestamp && currentTimestamp < sunsetTimestamp;

        const dayNightElement = document.querySelector('.day-night');
        if (isDaytime) {
            dayNightElement.textContent = 'Agora é Dia';
        } else {
            dayNightElement.textContent = 'Agora é Noite';
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                if (isDaytime) {
                    image.src = 'images/clear.png'
                } else {
                    image.src = 'images/clear_night.png'
                }
                break;

            case 'Rain':
                if (isDaytime) {
                    image.src = 'images/rain.png'
                } else {
                    image.src = 'images/rain_night.png'
                }
                break; 
            
            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                if (isDaytime) {
                    image.src = 'images/cloud.png';
                } else {
                    image.src = 'images/cloud_night.png'
                }
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});