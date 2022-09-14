const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    creator_id: { type: String, required: true},
});

module.exports = mongoose.model('List', listSchema);