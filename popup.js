document.addEventListener('DOMContentLoaded', () => {
  const getButton = document.getElementById('getButton');

  const ipOutput = document.getElementById('ipAdressOutput');
  const placeOutput = document.getElementById('locationOutput');

  const mainWeatherOutput = document.getElementById('mainWeatherOutput');
  const weatherDescriptionOutput = document.getElementById('wDescripitionOutput');
  const tempOutput = document.getElementById('tempOutput');
  const humidityOutput = document.getElementById('humidityOutput');
  const pressureOutput = document.getElementById('pressureOutput');
  const windSpeedOutput = document.getElementById('windSpeedOutput');
  const ssOutput = document.getElementById('ssOutput');
  const srOutput = document.getElementById('srOutput');

    window.addEventListener("load", () => { 
      
      chrome.runtime.sendMessage({ action: 'getUserData' }, response => {
        if (response.error) {
          console.error(response.error);
          return;
        }
  
        const uIP = response.ip;
        // const uLon = response.lon;
        // const uLat = response.lat;
        const uCity = response.city;
        const uCountry = response.country;
        const uState = response.state;
        ipOutput.textContent = uIP;
        placeOutput.textContent = uCity + ", " + uState + ", " + uCountry;

        chrome.storage.local.get(null, function(weatherData) {
          humidityOutput.textContent = "Humidity: " + weatherData.humidity + "%";
          pressureOutput.textContent = "Pressure: " + weatherData.pressure + " hPa";
          windSpeedOutput.textContent = "Wind: " + weatherData.windSpeed + " m/s";
          srOutput.textContent = "Sunrise at " + weatherData.srHours + ":" + weatherData.srMinutes + " Uhr";
          ssOutput.textContent = "Sunset at " + weatherData.ssHours + ":" + weatherData.ssMinutes + " Uhr";
          
          mainWeatherOutput.textContent = weatherData.weatherMain;
          weatherDescriptionOutput.textContent = weatherData.weatherDescription; 
          tempOutput.textContent = "Current " + weatherData.temp + "°C";
          tempMinMaxOutput.textContent = "min " + weatherData.temp_min + "°C / max " + weatherData.temp_max + "°C";
        });


      });
    });

    getButton.addEventListener('click', () => {

      chrome.runtime.sendMessage({ action: 'getWeather' }, response => {
        if (response.error) {
          console.error(response.error);
          return;
        }

        const weatherData = {
          temp : Math.floor(response.main.temp - 273.15), //Kelvinwert umwandeln in Celsius und Kommazahl abrunden
          temp_min : Math.floor(response.main.temp_min - 273.15),
          temp_max : Math.floor(response.main.temp_max - 273.15),

          weatherMain : response.weather[0].main,
          weatherDescription : response.weather[0].description,

          humidity : response.main.humidity,
          pressure : response.main.pressure,
          windSpeed : response.wind.speed,
          
          srHours : new Date(response.sys.sunrise * 1000).getHours(),
          srMinutes : new Date(response.sys.sunrise * 1000).getMinutes(),

          ssHours : new Date(response.sys.sunset * 1000).getHours(),
          ssMinutes : new Date(response.sys.sunset * 1000).getMinutes()
        }

        chrome.storage.local.set(weatherData, () => {});

        humidityOutput.textContent = "Humidity: " + weatherData.humidity + "%";
        pressureOutput.textContent = "Pressure: " + weatherData.pressure + " hPa";
        windSpeedOutput.textContent = "Wind: " + weatherData.windSpeed + " m/s";
        srOutput.textContent = "Sunrise at " + weatherData.srHours + ":" + weatherData.srMinutes + " Uhr";
        ssOutput.textContent = "Sunset at " + weatherData.ssHours + ":" + weatherData.ssMinutes + " Uhr";
        
        mainWeatherOutput.textContent = weatherData.weatherMain;
        weatherDescriptionOutput.textContent = weatherData.weatherDescription; 
        tempOutput.textContent = "Current " + weatherData.temp + "°C";
        tempMinMaxOutput.textContent = "min " + weatherData.temp_min + "°C / max " + weatherData.temp_max + "°C";
      });
    });

  });
    