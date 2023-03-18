const axios = require("axios");
const APIKEY = "2fca1c618cd5e124997e6a902b3cd444";
let url = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}`;
let iconStartLink = "https://openweathermap.org/img/wn/";

const getWeatherData = function (cityName, units = "metric") {
  let fullUrl = url + `&q=${cityName}&units=${units}`;
  return axios.get(fullUrl).then((response) => {
    return getSpcificFeilds(response.data, cityName);
  });
};

const getSpcificFeilds = function (weatherData, cityName) {
  let icon = iconStartLink + weatherData.weather[0].icon + "@2x.png";
  return {
    name: cityName,
    temperature: weatherData.main.temp,
    condition: weatherData.weather[0].description,
    conditionPic: icon,
  };
};

const GeograficalCoordinatesToCity = function (lat, lon) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
  return axios.get(url).then((result) => {
    return result.data[0].name;
  });
};

module.exports = { getWeatherData, GeograficalCoordinatesToCity };
