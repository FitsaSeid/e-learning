const QuestionModel = require("../model/questionModel")

const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.find();

        if (!questions) return res.status(404).json({ message: "unfortunately, there is no question found" });

        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json(error.message);
    }
}


const getQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await QuestionModel.findById(id);

        if (!question) return res.status(404).json({ message: "The question you're looking for doesn't exist" });

        res.status(200).json(question);
    } catch (error) {
        res.status(404).json(error.message);
    }
}
const addQuestion = async (req, res) => {

    const { question, questionAbout, questionType, choice, answer } = req.body;

    if (!question || !questionAbout || !questionType || !choice || !answer)
        return res.status(404).json({ message: "All attributes must be filled." })

    try {
        const result = await QuestionModel.create({ question, questionAbout, questionType, choice, answer });

        if (!result) return res.status(400).json({ message: "Something went wrong" })

        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await QuestionModel.deleteOne({ _id: id });

        if (!result) return res.status(400).json({ message: "Question cannot be deleted" });

        return res.status(200).json({ message: "Question deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateQuestion = async (req, res) => {

    const { id } = req.params;

    const data = req.body;
    try {
        const result = await QuestionModel.updateOne({ _id: id }, data);

        if (!result) return res.status(400).json({ message: "Something went wrong" })

        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getQuestions,
    getQuestion,
    addQuestion,
    deleteQuestion,
    updateQuestion
}