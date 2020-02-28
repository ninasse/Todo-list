const mongoose = require("mongoose");

const schemaToDo = new mongoose.Schema({
        todo: {type: String, required: [true, "Fyll i fältet för ny uppgift!"]},
        creator: {type: String, required: [true, "Fyll i namn!"]},
        priority: {type: Number, min: 1, max: 5},
        date: {type: Date, default: Date.now},
    });

// variable Todo referes to a class/ model. Todo inside parenteses referes to the collection/ database
const Todo = mongoose.model("todo", schemaToDo)

module.exports = Todo;