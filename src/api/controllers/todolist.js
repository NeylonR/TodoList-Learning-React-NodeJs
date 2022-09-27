const Todolist = require('../models/TodoList');

exports.editList = (req, res) => {
    delete req.body._id;
    const titleLength = req.body.title.length;
    if(titleLength < 4 || titleLength > 40) return res.status(400).json({message: 'Title has to contains between 4 and 40 characters.'})
    Todolist.findOne({ _id: req.params.id})
    .then((todolist) => {
        if(todolist.creator_id !== req.auth.userId) return res.status(401).json({message: "Not authorized"});
        Todolist.updateOne({ _id: req.params.id}, {...req.body})
            .then(() => { res.status(200).json({message: 'Todolist edited.'})})
            .catch(error => res.status(401).json({ error }));
    })
};

exports.createList = (req, res) => {
    const todoList = new Todolist({
        creator_id: req.auth.userId,
        title: `New list`, /*req.body.title.trim().toString()*/
        task: []
    });
    todoList.save()
    .then(todoList => res.status(200).json(todoList))
    .catch(error => res.status(401).json({ error }));
};

exports.getUserList = (req, res) => {
    Todolist.find({ creator_id: req.auth.userId})
    .then(todoLists => res.status(200).json(todoLists))
    .catch(error => res.status(401).json({ error }));
};

exports.deleteList = (req, res) => {
    Todolist.findOne({ _id: req.params.id})
        .then(todoList => {
            if(todoList.creator_id !== req.auth.userId) return res.status(401).json({message: "Not authorized"});
            Todolist.deleteOne({ _id: req.params.id})
                .then(() => { res.status(200).json({message: 'Todolist deleted.'})})
                .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};