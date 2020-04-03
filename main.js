const mongoose = require("mongoose");
const config = require("./config/config");
require('dotenv').config()
const { app, PORT } = require('./src/server')

const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

// connection to db and then listen to PORT
mongoose.connect(config.mongoDB.databaseURL, dbOptions).then(() => {
    app.listen(PORT, () => console.log(`App is up on port ${PORT}!`))
})

module.exports = { app, PORT }