const QuestionModel = require("../model/questionModel");
const UserModel = require("../model/userModel");

const verifyMCQAnswers = async (req, res) => {
    const { id: questionId } = req.params;
    const { id: userId } = req.user;

    let { answer } = req.body;
    answer = answer.toLowerCase();

    try {
        const question = await QuestionModel.findById(questionId);

        if (!question) return res.status(404).json({ message: "Question not found" });

        if (answer === question.answer) {
            await UserModel.updateOne({ _id: userId },
                {
                    $push: {
                        answeredQuestions: { questionId: questionId, isCorrect: true }
                    },
                    $inc: {
                        totalScore: 1
                    }
                });

            if (!res) return res.status(400).json({ message: "Something went wrong" });

            res.status(200).json({ message: "Correct" })
        } else {
            await UserModel.updateOne({ _id: userId },
                {
                    $push: {
                        answeredQuestions: { questionId: questionId, isCorrect: false }
                    }
                });

            if (!res) return res.status(400).json({ message: "Something went wrong" });

            res.status(200).json({ message: "Incorrect" })
        }

    } catch (error) {
        return res.status(400).json({ message: error?.message });
    }
}

module.exports = {
    verifyMCQAnswers
}