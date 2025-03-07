// Here is where we import modules
// We begin by loading Express

// dependencies
const dotenv = require("dotenv");
const express = require('express');
const mongoose = require("mongoose");
const Fruit = require("./Models/fruit.js");


// initialize the express application
const app = express();

// config code
dotenv.config();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// Mongoose/MongoDB Event Listener
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// mount middleware functions here
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
// body parser middleware: this function reads the request box
// and decodes it into req.body so we can access form data!

// Root path/route "HomePage"
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// Path to the page with a form we can fill out
// and submit to add a new fruit to the database
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs"); // <-- relative file path; don't need a trailing slash w/ render
})


// path used to receive form submissions
app.post("/fruits", async (req, res) => {
  //conditional logic to handle the
  // default behavior of the HTML form checkbox fields
  // we do this when we need a boolean instead of a string
  if(req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  }  else {
    req.body.isReadyToEat = false;
  };
  // create the data in our database
  await Fruit.create(req.body);
  // redirect tells the client to navigate to
  // a new URL pat/another page
  res.redirect("/fruits/new"); // <-- URL path
});

// index route for fruits = sends a page that lists all fruits from the db
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find({});
  console.log(allFruits);
  res.render("fruits/index.ejs", { fruits: allFruits} )
});

const portNumber = 3000;
app.listen(portNumber, () => {
  console.log('Listening on port 3000');
});
