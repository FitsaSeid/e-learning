const { getAllUsers } = require('../controller/userController');

const router = require('express').Router();


router.get("/users", getAllUsers);


module.exports = router;