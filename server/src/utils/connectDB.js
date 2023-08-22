const mongoose = require('mongoose');

const DB = String(process.env.MONGODB_URL);

const connectDB = () => {
  mongoose.connect(DB);
  mongoose.connection.on('connected', () => {
    console.log('DB Connected 👍');
  });
  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to DB ❌', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('DB Disconnected 💔');
    connectDB();
  });
};

module.exports = connectDB;
