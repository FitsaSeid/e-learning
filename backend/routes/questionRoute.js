const { getQuestions, getQuestion, addQuestion, deleteQuestion, updateQuestion } = require('../controller/question');

const router = require('express').Router();

router.get('/questions', getQuestions);
router.get('/question/:id', getQuestion);
router.post('/question', addQuestion);
router.delete('/question/:id', deleteQuestion);
router.patch('/question/:id', updateQuestion);

module.exports = router