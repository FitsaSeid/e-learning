const { signUp, signIn, refreshToken, signOut } = require('../controller/authController');

const router = require('express').Router();


router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/refresh", refreshToken);

module.exports = router;