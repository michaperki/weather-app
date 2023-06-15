const BaseURL = "https://api.weatherapi.com/v1/current.json?key=";
const APIKey = "6336a6958c58416fbed203528230905&q=";

function getWeather(city) {
  const data = fetch(BaseURL + APIKey + city, { mode: "cors" })
    .then((response) => response.json())
    .then((response) => processData(response))
    .catch((err) => console.log(err));
}

function processData(data) {
  const { name, country } = data.location;
  const { temp_f, feelslike_f, wind_mph } = data.current;
  console.log( name, country, temp_f, feelslike_f, wind_mph );
  return { name, country, temp_f, feelslike_f, wind_mph };
}

getWeather("Dubai");
