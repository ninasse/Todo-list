require('dotenv').config()

const mongoDB = {
    databaseURL: process.env.MONGO_DB
};

module.exports = mongoDB;