const { verifyMCQAnswers } = require('../controller/answerController');

const router = require('express').Router();

router.post('/verify-answer/:id', verifyMCQAnswers);

module.exports = router