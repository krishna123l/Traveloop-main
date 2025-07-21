const mongoose = require('mongoose');

const DB = process.env.MONGO_DB_URL.replace(
  '<db_password>',
  process.env.MONGO_DB_PASSWORD
);

const connectToDb = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connection sucessful');
  } catch (err) {
    console.log(`Error to connect to the Database`);
  }
};

module.exports = connectToDb();
