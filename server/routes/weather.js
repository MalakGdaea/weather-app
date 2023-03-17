const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/weatherDB");
const weatherData = require("../weather-data");
const Weather = require("../models/Weather");

router.get("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;
  weatherData.getWeatherData(cityName).then((weatherResult) => {
    res.send(weatherResult);
  });
});

router.get("/weather", function (req, res) {
  let city = req.query.city;
  let query = city ? { name: city } : {};
  try {
    Weather.find(query).then((allcityWeather) => {
      if (allcityWeather.length == 0) {
        res.send({ message: `There are no weather date about ${city} city` });
        return;
      }
      res.send(allcityWeather);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/weather", function (req, res) {
  let weatherInCity = req.body;
  let weatherDoc = new Weather(weatherInCity);
  try {
    weatherDoc.save();
    res
      .status(201)
      .send({ Message: `${weatherInCity.name} city saved successfully.` });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/weather", async function (req, res) {
  let city = req.query.city;
  try {
    let isDeleted = await Weather.deleteMany({ name: city });
    if (isDeleted.deletedCount == 0) {
      res.send({ message: `There are no data about ${city} to delete.` });
    } else {
      res.send({ message: `${city} weather deleted successfully.` });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
