const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    test1: Number
})

const Test = mongoose.model("Test", testSchema);
module.exports = Test;