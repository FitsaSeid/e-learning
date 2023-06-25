const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    role: { type: String, default: "student" },
    password: { type: String, require: true },
    refreshToken: { type: String },
    answeredQuestions: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' },
            isCorrect: { type: Boolean, require: true }
        }
    ],
    totalScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserModel", userSchema);