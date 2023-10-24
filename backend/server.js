require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const cors = require('cors'); // Require the 'cors' package


//express app
const app = express();

// Apply CORS middleware to your Express app
app.use(cors());

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening to the port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
