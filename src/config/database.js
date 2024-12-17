require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = process.env.NODE_ENV === 'test' 
  ? process.env.DB_TEST_URI
  : process.env.DB_URI;

mongoose.connect(dbURI)
    .then(() => console.log(`MongoDB connected successfully to ${dbURI}`))
    .catch((error) => console.error('Unable to connect to MongoDB:', error));

module.exports = mongoose;
