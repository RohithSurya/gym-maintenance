const mongoose = require("mongoose");

// BUILD THE MONGO URI connection string
const { username, password, database } = require("../config.json");

const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.g9wbkot.mongodb.net/${database}?retryWrites=true&w=majority`;

// mongodb+srv://prsurya1020:<password>@cluster0.g9wbkot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
