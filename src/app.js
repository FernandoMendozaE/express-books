const express = require("express");
const app = express();
const path = require("path"); // concatena direcctorios
const morgan = require("morgan");

// Settings
app.set("port", 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Midedlewares
app.use(morgan("dev")); // use utiliza
app.use(express.urlencoded({ extended: false })); // Comvierte los datos a formato JSON

// Routes
app.use(require("./routes/index"));

// Static
app.use(express.static(path.join(__dirname, "public")));

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("404 Not found");
});

module.exports = app;
