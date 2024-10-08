const request = require("request");

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    encodeURIComponent(address) +
    "&key=291f9abd5b104814ab8d216d774c3f98&language=en&pretty=1&limit=1";

  request({ url: geocodeUrl, json: true }, (error, { body } = {}) => {
    //const { label: productLabel, stock, temp = "temp" } = response;

    if (error) {
      callback("Unable to connect to the geocoding service!", undefined);
    } else if (body.results.length === 0) {
      callback("Unable to find coordinates!", undefined);
    } else {
      callback(undefined, {
        latitude: body.results[0].geometry.lat,
        longitude: body.results[0].geometry.lng,
        location: body.results[0].formatted,
      });
    }
  });
};

module.exports = geocode;
