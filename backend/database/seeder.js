const mongoose = require('mongoose');
const UserModel = require('../model/userModel');
const data = require('./data');
const router = require('express').Router();


const seeder = async (req, res) => {
    try {
        await UserModel.deleteMany();
        const insertUser = await UserModel.insertMany(data.users);
        res.status(200).json({ data: insertUser });
    } catch (error) {
        console.log(error);
    }
}
router.get('/', seeder);

module.exports = router;