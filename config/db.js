
const mongoose = require("mongoose");

async function connectToMongoDB () {
  try {
    const uri =process.env.MONGODB
  
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri);

    console.log(`Connected to MongoDB`);

    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB
};