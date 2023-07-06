const $ = require('jquery');
const weather = Weather();
const render = new Render();

const displaySavedWeather = async function () {
  let savedWeather = await weather.getCitiesData();
  render.renderCitiesWeather(savedWeather);
};

displaySavedWeather();

const displayCityWeather = async function (cityName) {
  let citiesWeather = await weather.getCityWeather(cityName);
  render.renderCitiesWeather(citiesWeather);
};

$("#search").on("click", function () {
  let city = $("#cityInput").val();
  displayCityWeather(city);
  $("#cityInput").val("");
});

$("#weatherData").on("click", ".save", async function () {
  let weatherId = $(this).closest(".row").data().id;
  await weather.changeCityToSaved(weatherId);
  $(this).removeClass("save");
  $(this).addClass("delete");
  $(this).text("do_not_disturb_on");
});

$("#weatherData").on("click", ".delete", async function () {
  let cityId = $(this).closest(".row").data().id;
  let citiesWeather = weather.deleteCityWeather(cityId);
  render.renderCitiesWeather(citiesWeather);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  $.get(
    `/cityName/?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  ).then((cityName) => {
    displayCityWeather(cityName);
  });
}

getLocation();

$("#weatherData").on("click", ".refresh", async function () {
  let cityId = $(this).closest(".row").data().id;
  let citiesWeather = await weather.updateCityWeather(cityId);
  render.renderCitiesWeather(citiesWeather);
});
