const mongoose = require('mongoose');

const todoListSchema = mongoose.Schema({
    creator_id: { type: String, required: true},
    title: { type: String, minlength: 4, maxlength: 20, required: true},
    task: { 
        type: [{
            id: String,
            text: String,
            isDone: Boolean,
        }], 
        default: undefined,
        required: true
    }
});

module.exports = mongoose.model('Todolist', todoListSchema);