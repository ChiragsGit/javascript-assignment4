const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const resultDiv = document.querySelector("#result");

// added event listener for search button.
searchBtn.addEventListener("click", function () {
  let city = cityInput.value;
  if (city) {
    updateDisplay(city);
  } else {
    resultDiv.textContent = "Please enter a city name.";
  }
});

// created an updateDisplay() function
function updateDisplay(city) {
  console.log("Received Value: " + city);

  // here is the api key i acquired from https://www.weatherapi.com/my/
  let apiKey = "cd9206c716e643eebf805648232108";
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  // created a fetch function and passed it in the URL
  // https://www.weatherapi.com/docs/ this is the documentation i used for the weather api.
  fetch(apiUrl)
    //   if there is an error in the user input, display the error message
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred: " + response.status);
      }
      return response.json();
    })
    // if the input the user has inputted, extract the weather information from the data
    .then((data) => {
      if (data.current) {
        const cityName = data.location.name;
        const temperature = data.current.temp_c;
        const feelsLike = data.current.feelslike_c;
        const weatherDescription = data.current.condition.text;
        // this displays the weather information on the page
        const html = `<p>City: ${cityName}</p><p>Temperature: ${temperature}°C</p> <p>Feels like: ${feelsLike}°C</p><p>Weather: ${weatherDescription}</p>`;
        resultDiv.innerHTML = html;
      } else {
        resultDiv.innerHTML = "<p>Weather data not found.</p>";
      }
    })
    .catch(
      (error) =>
        (resultDiv.textContent = "Error getting data from API: " + error)
    );
}
