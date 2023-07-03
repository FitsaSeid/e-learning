require('dotenv').config();
const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const userModel = require("../model/userModel");

const signUp = async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).json({ message: "Please fill all fields" });

    try {
        let isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) return res.status(400).json({ message: "User already exist" });

        const approvedUser = new UserModel({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10)
        })

        await approvedUser.save();

        isEmailExist = await UserModel.findOne({ email });
        if (!isEmailExist) return res.status(401).json({ message: "Something went wrong" });

        const dataToBeDecoded = {
            id: isEmailExist._id,
            firstName: isEmailExist.firstName,
            email: isEmailExist.lastName
        };

        const accessToken = tokenGenerator(dataToBeDecoded);
        const refreshToken = jwt.sign(dataToBeDecoded, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });

        let encodedRT = crypto.AES.encrypt(refreshToken, process.env.REFRESH_TOKEN_ENCRYPTION_KEY)
        encodedRT = encodedRT.toString();

        const updateRefreshToken = await UserModel.updateOne({ email }, { refreshToken: encodedRT });

        if (!updateRefreshToken) return res.sendStatus(401);

        res.cookie('refreshToken', encodedRT, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 1000 * 60 * 60 * 72 }).json({ accessToken: accessToken, firstName });

    } catch (error) {
        res.status(400).json(error)
    }

}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({ message: "All fields must be filled" });

    const isEmailExist = await UserModel.findOne({ email });

    if (!isEmailExist) return res.status(401).json({ message: "unauthorized user" });

    const user = await bcrypt.compare(password, isEmailExist.password);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const dataToBeDecoded = {
        id: isEmailExist._id,
        firstName: isEmailExist.firstName,
        email: isEmailExist.lastName
    };

    const accessToken = tokenGenerator(dataToBeDecoded);
    const refreshToken = jwt.sign(dataToBeDecoded, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });

    let encodedRT = crypto.AES.encrypt(refreshToken, process.env.REFRESH_TOKEN_ENCRYPTION_KEY)
    encodedRT = encodedRT.toString();

    const updateRefreshToken = await UserModel.updateOne({ email }, { refreshToken: encodedRT });

    if (!updateRefreshToken) return res.sendStatus(401);

    res.cookie('refreshToken', encodedRT, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 1000 * 60 * 60 * 72 })

    res.status(200).json({ accessToken: accessToken });
}

const signOut = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.json({ message: "Already signed out" });

    const user = await UserModel.findOne({ refreshToken });
    if (!user) return res.json({ message: "Already signed out" });

    await userModel.updateOne({ refreshToken }, { refreshToken: "" });

    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'None' }).status(200).json({ message: "successfully logged out" });
}
const tokenGenerator = (dataToBeDecoded) => {
    return jwt.sign(dataToBeDecoded, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: '30m' });
}

const refreshToken = async (req, res) => {

    try {
        console.log("Refresh")
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.sendStatus(401);

        const user = await UserModel.findOne({ refreshToken });
        if (!user) return res.status(401);

        let decodedRT = crypto.AES.decrypt(refreshToken, process.env.REFRESH_TOKEN_ENCRYPTION_KEY)
        decodedRT = decodedRT.toString(crypto.enc.Utf8)

        jwt.verify(decodedRT, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, (error, data) => {
            const { id, firstName, email } = data;

            if (error) return res.status(403);

            const newToken = tokenGenerator({ id, firstName, email });
            if (!newToken) res.status(403).json({ message: "something went wrong" });

            res.status(200).json({ accessToken: newToken });
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    refreshToken
}