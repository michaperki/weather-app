const BaseURL = "https://api.weatherapi.com/v1/current.json?key=";
const APIKey = "6336a6958c58416fbed203528230905&q=";

function getWeather(city) {
  return fetch(BaseURL + APIKey + city, { mode: "cors" })
    .then(handleErrors)
    .then((response) => response.json())
    .then(processData)
    .catch((err) => console.log(err));
}

function handleErrors(response) {
  if (!response.ok) {
    alert("user must enter a valid city name");
  }
  return response;
}

function processData(data) {
  const { name, country } = data.location;
  const { temp_f, feelslike_f, wind_mph } = data.current;
  console.log(name, country, temp_f, feelslike_f, wind_mph);
  return { name, country, temp_f, feelslike_f, wind_mph };
}

const form = document.getElementById("weather-form");
form.addEventListener("submit", (e) => handleSubmit(e));

async function handleSubmit(e) {
  e.preventDefault();
  const userInput = getUserInput();
  const weatherData = await getWeather(userInput);
  displayWeather(weatherData);
}

function getUserInput() {
  return document.getElementById("city-input").value;
}

function displayWeather(data) {
  const outputContainer = document.getElementById("output-container");
  clearChildNodes(outputContainer);
  const title = document.createElement("h1");
  const temp = document.createElement("p");
  const wind = document.createElement("p");

  title.innerText = `${data.name}, ${data.country}`;
  temp.innerText = `temp: ${data.temp_f} degrees fahrenheit\nfeels like: ${data.feelslike_f} degrees fahrenheit`
  wind.innerText = `wind: ${data.wind_mph} miles per hour`

  outputContainer.appendChild(title);
  outputContainer.appendChild(temp);
  outputContainer.appendChild(wind);
}

function clearChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
