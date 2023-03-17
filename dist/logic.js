const Weather = function () {
  const citiesWeather = [];
  let idCounter = 0;

  const getCitiesData = function () {
    return $.get("/weather").then((citiesWeatherInDB) => {
      citiesWeather.push(...citiesWeatherInDB);
      citiesWeather.map((cityWeather) => {
        cityWeather.saved = true;
        cityWeather.id = idCounter;
        idCounter++;
      });
      return citiesWeather;
    });
  };

  const changeCityToSaved = function (id) {
    let index = citiesWeather.findIndex((city) => city.id == id);
    citiesWeather[index].saved = true;
    cityWeather = {
      name: citiesWeather[index].name,
      temperature: citiesWeather[index].temperature,
      condition: citiesWeather[index].condition,
      conditionPic: citiesWeather[index].conditionPic,
    };
    saveCityWeather(cityWeather);
  };

  const getCityWeather = function (city) {
    return $.get(`/weather/${city}`).then((cityWeather) => {
      cityWeather.saved = false;
      cityWeather.id = idCounter;
      idCounter++;
      citiesWeather.push(cityWeather);
      return citiesWeather;
    });
  };

  const saveCityWeather = function (cityData) {
    $.post("/weather", cityData, function (response) {
      console.log(response.message);
    });
  };

  const deleteCityWeather = function (id) {
    let index = citiesWeather.findIndex((city) => city.id == id);
    if (citiesWeather[index].saved) {
      deleteCityWeatherFromDB(citiesWeather[index].name);
    }
    citiesWeather.splice(index, 1);
    return citiesWeather;
  };

  const deleteCityWeatherFromDB = function (cityName) {
    $.ajax({
      url: `/weather/?city=${cityName}`,
      type: "DELETE",
      success: function (response) {
        console.log(response.message);
      },
    });
  };

  return {
    getCitiesData,
    getCityWeather,
    changeCityToSaved,
    deleteCityWeather,
  };
};
