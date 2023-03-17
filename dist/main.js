const weather = Weather();
const render = new Render();

const displaySavedWeather = async function () {
  let savedWeather = await weather.getCitiesData();
  render.renderCitiesWeather(savedWeather);
};

displaySavedWeather();

const displaySearchCityWeather = async function (cityName) {
  let citiesWeather = await weather.getCityWeather(cityName);
  render.renderCitiesWeather(citiesWeather);
};

$("#search").on("click", function () {
  let city = $("#cityInput").val();
  displaySearchCityWeather(city);
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
