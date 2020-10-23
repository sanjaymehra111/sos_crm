const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
//port = 80;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to new application." });
});

// simple route
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to Home Page." });
});


require("./routes/home.routes")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log("Server is running on port 3000.");
});