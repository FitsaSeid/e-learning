const router = require('express').Router();
const authorize = require('../controller/authorize');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const questionRouter = require('./questionRoute');

router.use('/', authRoute);
router.use('/', authorize, userRoute)
router.use('/', authorize, questionRouter)


module.exports = router;