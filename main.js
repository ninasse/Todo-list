//import express from 'express';
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/config");
const { toDoRoutes, PORT } = require("./routes/toDoRoutes");
const sassMiddleware = require("node-sass-middleware");
const dbUrl = process.env.MONGO_ATLAS_URL || require('./config/config').databaseURL

const app = express();


if (process.env.NODE_ENV == 'development') {
    const sassMiddleware = require('node-sass-middleware')
    app.use(sassMiddleware({ // tell sassMiddleware where src file and dest directory is
        src: 'scss',
        dest: 'public',
        // debug: true, // för att skriva ut data till konsollen
        outputStyle: 'compressed'
    }))
}


//middleware
// define a static folder, 'public'
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
// define what view engine to use, ejs in this case
app.set('view engine', 'ejs')


// app.use(sassMiddleware({
//     src: path.join(__dirname, "scss"),
//     dest: path.join(__dirname, "public")
// }));


// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// routes
app.use(toDoRoutes);

// extra features to be passed when connecting to db to avoid errors
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};


// connection to db and then listen to PORT
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }
mongoose.connect(dbUrl, dbOptions).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})

module.exports = { app, toDoRoutes, PORT }