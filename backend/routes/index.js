const router = require('express').Router();
const authorize = require('../controller/authorize');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const questionRoute = require('./questionRoute');
const answerRoute = require('./answerRoute');

router.use('/', authRoute);
router.use('/', authorize, userRoute)
router.use('/question', authorize, questionRoute)
router.use('/', authorize, answerRoute)


module.exports = router;