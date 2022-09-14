const mongoose = require('mongoose');

const listContentSchema = mongoose.Schema({
    list_id: { type: String, required: true},
    label: { type: String, required: true}
});

module.exports = mongoose.model('ListContent', listContentSchema);