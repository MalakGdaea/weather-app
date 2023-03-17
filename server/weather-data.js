const axios = require("axios");
const APIKEY = "2fca1c618cd5e124997e6a902b3cd444";
let url = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}`;
let iconStartLink = "https://openweathermap.org/img/wn/";

const getWeatherData = function (cityName, units = "metric") {
  url = url + `&q=${cityName}&units=${units}`;
  return axios.get(url).then((response) => {
    return getSpcificFeilds(response.data, cityName, units);
  });
};

const getSpcificFeilds = function (weatherData, cityName, units) {
  let icon = iconStartLink + weatherData.weather[0].icon + "@2x.png";
  return {
    name: cityName,
    temperature: weatherData.main.temp,
    condition: weatherData.weather[0].description,
    conditionPic: icon,
  };
};

module.exports = { getWeatherData };
