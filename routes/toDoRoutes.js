const express = require("express");
const Todo = require("../model/Todo");
// express.Router is a function within express to handle our routes.
const router = express.Router();

const tasks = 3;

router.route("/")
    .get((request, response) => {
        response.redirect("/todolist")
    });

router.route("/todolist/AtoZ")
    .get(async (request, response) => {
        console.log(request.query);
        const page = request.query.page;
        const sorted = request.query.sort + 1;
        const toDos = await Todo.find().sort({ todo: sorted }).skip((page - 1) * tasks).limit(tasks);
        response.render("toDoList", { toDos });
    });

router.route("/todolist/prio1to5")
    .get(async (request, response) => {
        console.log(request.query);
        const page = request.query.page;
        const sorted = request.query.sort - 1;
        const toDos = await Todo.find().sort({ priority: sorted }).skip((page - 1) * tasks).limit(tasks);
        response.render("toDoList", { toDos });
    });

router.route("/todolist")
    .get(async (request, response) => {

        const page = request.query.page;
        const toDos = await Todo.find().skip((page - 1) * tasks).limit(tasks);
        response.render("toDoList", { toDos, page });
    })
    .post(async (request, response) => {
        const toDo = await new Todo({
            todo: request.body.todo,
            creator: request.body.creator,
            priority: request.body.priority,
            //date: {type: Date, default: Date.now}
        });
        toDo.validate(function (err) {
            if (err) {
                console.log(err);
                response.render("errors", { err });
            } else {
                toDo.save();
                response.redirect("/todolist");
            }
        });
    });

router.route("/todolist/about")
    .get((request, response) => {
        response.render("about");
    });

router.route("/delete/:id")
    .get(async (request, response) => {
        await Todo.deleteOne({ _id: request.params.id });
        response.redirect("/todolist");
    });

router.route("/update/:id")
    .get(async (request, response) => {
        const editRes = await Todo.findById({ _id: request.params.id });
        response.render("edit", { editRes });
    })

    .post(async (request, response) => {
        await Todo.updateOne({ _id: request.params.id }, { $set: { todo: request.body.todo, creator: request.body.creator, priority: request.body.priority } }, { runValidators: true });
        console.log(request.body);
        response.redirect("/todolist");
    });

module.exports = router;
