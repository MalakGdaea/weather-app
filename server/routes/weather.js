const express = require("express");
require('dotenv').config();
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/weatherDB');
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

router.get("/cityName", function (req, res) {
  let latitude = Number(req.query.lat);
  let longitude = Number(req.query.lon);
  weatherData
    .GeograficalCoordinatesToCity(latitude, longitude)
    .then((cityName) => {
      res.send(cityName);
    });
});

router.put("/weather/:cityName", function (req, res) {
  weatherData.getWeatherData(req.params.cityName).then((weatherResult) => {
    try {
      Weather.findOneAndUpdate(
        { name: weatherResult.name },
        {
          temperature: weatherResult.temperature,
          condition: weatherResult.condition,
          conditionPic: weatherResult.conditionPic,
        }
      ).then(() => {
        res.send({ message: `city weather updated successfully.` });
      });
    } catch (error) {
      res.send(error);
    }
  });
});

module.exports = router;
