
const mongoose = require("mongoose");

const Connection = async (MONGODB_URL) => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error while connection to database,${error}`);
  }
};

module.exports = Connection;




