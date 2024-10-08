const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWeather = require("./utils/weather");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "My Weather App",
    name: "Karen OK",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "My About Page",
    name: "Karen OK",
  });
});

// this shows in the browser when user goes to the root app.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Karen OK",
    message:
      "This is the help page message to inform you of all necessary info.",
  });
});

// this shows in the browser when user goes to the root app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const newAddress = req.query.address;

  geocode(newAddress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    getWeather(latitude, longitude, (weatherError, forecastData) => {
      if (weatherError) {
        return res.send({ weatherError });
      }
      res.send({
        location,
        Forecast: forecastData,
        Address: newAddress,
      });
    });
  });
});

// require geocdde and forecast files
// use the address to geocode
// use coordinates to get forecast
// send back the real forecast and location
// check for errors

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Error Page",
    name: "Karen OK",
    message: "Help Article not Found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    name: "Karen OK",
    message: "Page not found",
  });
});

// this show when running the app
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
