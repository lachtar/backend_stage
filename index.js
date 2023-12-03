const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

dotenv.config();

// http headers security
app.use(helmet());


// Parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Preventing HTTP parameter pollution
app.use(hpp());

// CORS
app.use(cors());

// Importing routes
const authRoute = require("./routes/authRoute");

// Routes
app.use("/api/auth", authRoute);

// DB connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })


  .then(() => {
    console.log('Connexion réussie à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });

// Server connection
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("Listening on port " + port);

});

