const $ = require('jquery');
class Render {
  constructor() {
    this.source = $("#weatherScript").html();
    this.template = Handlebars.compile(this.source);
  }

  renderCitiesWeather(citiesWeather) {
    $("#weatherData").empty();
    let newElem = this.template({ cityWeather: citiesWeather });
    $("#weatherData").append(newElem);
  }
}
