const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { connectToMongoDB } = require("./config/db");
require("dotenv").config({ path: "./.env" });
const app = express();
mongoose.set('strictQuery', true);

// Connect to MongoDB


// Middleware
app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

// Routes
const userRoutes = require('./routes/userRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoute');

app.use('/api/user', userRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
const PORT = process.env.PORT || 5000;
connectToMongoDB();

app.listen(PORT,() => {

  console.log(`Backend server is running on port ${PORT}`);
});
