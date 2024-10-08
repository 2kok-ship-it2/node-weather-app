const request = require("request");

const getWeather = (lat, lng, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4aaca9aa417790bd8522fe002b66bd5d&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(lng) +
    "&units=m";

  // used shorthand for url
  // destructure response to body
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const currentTemperature = body.current.temperature;
      const feelsLikeTemperature = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions[0];
      const humidity = body.current.humidity;
      const uvindex = body.current.uv_index;
      const windspeed = body.current.wind_speed;

      const additionalForecastData = `The humdity is ${humidity}%. The wind speed is ${windspeed}km per hour.\n`;

      const forecast =
        `${weatherDescription}. It is currently ${currentTemperature} degrees outside. It feels like ${feelsLikeTemperature} degrees outside with a UV index of ${uvindex}.\n\n` +
        additionalForecastData;

      callback(undefined, forecast);
    }
  });
};

module.exports = getWeather;
