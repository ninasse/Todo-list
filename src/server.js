const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const PORT = process.env.PORT || 8080;
const toDoRoutes = require("../routes/toDoRoutes");
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

app.use(sassMiddleware({
    src: 'sass',
    dest: 'public',
    outputStyle: 'compressed'
}));

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use(toDoRoutes);

module.exports = {
    app,
    PORT,
    express
}
