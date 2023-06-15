const BaseURL = "https://api.weatherapi.com/v1/current.json?key=";
const APIKey = "6336a6958c58416fbed203528230905&q=";

function getWeather(city) {
  fetch(BaseURL + APIKey + city, { mode: "cors" })
    .then(handleErrors)
    .then((response) => response.json())
    .then(processData)
    .catch((err) => console.log(err));
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
}

function processData(data) {
  const { name, country } = data.location;
  const { temp_f, feelslike_f, wind_mph } = data.current;
  console.log(name, country, temp_f, feelslike_f, wind_mph);
  return { name, country, temp_f, feelslike_f, wind_mph };
}

const btn = document.getElementById("submit-btn");
const input = document.getElementById("city-input");
const form = document.getElementById("weather-form");

form.addEventListener("submit", (e) => handleSubmit(e));

function handleSubmit(e) {
  e.preventDefault();
  const data = getUserInput();
  getWeather(data.toString());
}

function getUserInput() {
  return document.getElementById("city-input").value;
}
