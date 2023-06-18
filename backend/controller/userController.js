const userModel = require("../model/userModel")

const getAllUsers = async (req, res) => {
    const users = await userModel.find();
    if (!users) return res.status(404).json({ message: "No user found" });
    res.status(200).json(users)
}

module.exports = {
    getAllUsers
}