<h1>How to Use the Extension:</h1>

1. Install Google Chrome and download the files from this repository to your computer.
2. Open the file "background.js". Here, you need to include two new API Keys.
     - For weather data, we use OpenWeatherMap. Sign up for a free account and obtain your API Key from [OpenWeatherMap](https://openweathermap.org/). Note that exceeding 1,000 API calls per day may incur a small fee. Once you have your API Key, paste it into <b>line 15</b> of the code.
     - For location data, we use RapidAPI, a hub for various APIs. Our specific API is called IP-Address-Tracker-Free. Create an account on RapidAPI, and then copy the API Key into <b>line 42</b> of your code. You can find the API [here](https://rapidapi.com/mark2info/api/ip-address-tracker-free).
3. In Chrome, click the three dots in the top right corner and select "Manage Extensions".
4. Activate Developer Mode.
5. Click the "Load Unpacked" button.
6. Choose the folder on your PC where you downloaded the files from this repository.
7. You're now ready to use the extension!
---
Note: <br>
<i>Sometimes, you may encounter "undefined" where the weather data should appear, and Chrome may throw an error. If this happens, try again later or re-upload the folder, and it should work. Please be aware that the extension may still have some bugs.
