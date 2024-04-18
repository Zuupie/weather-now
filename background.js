chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getUserData') {
    fetchIP()
      .then(uData => {
        sendResponse(uData);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });

    return true;
  }

  if (request.action === 'getWeather') {
    const apiKey = "___KEY___"; //Hier muss der OpenWeatherMap Key rein
    let city = "";

    fetchIP()
      .then(uData => {
        city = uData.city;
        return fetchWeather(city, apiKey);
      })
      .then(weatherData => {
        sendResponse(weatherData);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });

    return true;
  }
});



async function fetchIP()
{
  const url = 'https://ip-address-tracker-free.p.rapidapi.com/rapidapi/ip';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '___KEY___', //Hier muss der RapidAPI Key rein
      'X-RapidAPI-Host': 'ip-address-tracker-free.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const uData = await response.json();
    return uData;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error;
  }
};


 
async function fetchWeather(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Fehler beim Abrufen der Wetterdaten:', error);
  }
}


