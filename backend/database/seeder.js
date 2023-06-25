const mongoose = require('mongoose');
const UserModel = require('../model/userModel');
const data = require('./data');
const QuestionModel = require('../model/questionModel');
const router = require('express').Router();


const seeder = async (req, res) => {
    try {
        await UserModel.deleteMany();
        await QuestionModel.deleteMany();
        const insertUser = await UserModel.insertMany(data.users);
        const insertQuestion = await QuestionModel.insertMany(data.questions);
        res.status(200).json({ data: insertUser + insertQuestion });
    } catch (error) {
        console.log(error);
    }
}
router.get('/', seeder);

module.exports = router;