const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionType: { type: String, require: true },
    questionAbout: { type: String, require: true },
    question: { type: String, require: true },
    choice: {
        a: { type: String },
        b: { type: String },
        c: { type: String },
        d: { type: String },
    },
    answer: { type: String, require: true }


})

module.exports = mongoose.model('QuestionModel', questionSchema);