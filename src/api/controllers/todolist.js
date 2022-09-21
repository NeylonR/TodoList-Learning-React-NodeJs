const Todolist = require('../models/TodoList');

exports.edit = (req, res, next) => {
    Todolist.findOne({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.create = (req, res, next) => {
    // console.log(req.auth.userId)
    delete req.body._id;
    const todoList = new Todolist({
        ...req.body,
        creator_id: req.auth.userId,
        title: req.body.title,
        task: [...req.body.task]
    });
    todoList.save()
    .then(todoList => res.status(200).json(todoList))
    .catch(error => {
        res.status(401).json({error}); 
        // console.log(todoList)
    });
};

exports.getUserList = (req, res, next) => {
    Todolist.find({ creator_id: req.auth.userId})
    .then(todoLists => res.status(200).json(todoLists))
    .catch(error => res.status(401).json({ error }));
};