const router = require('express').Router();
const authorize = require('../controller/authorize');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');

router.use('/', authRoute);
router.use('/', authorize, userRoute)


module.exports = router;