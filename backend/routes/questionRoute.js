const { getQuestions, getQuestion, addQuestion, deleteQuestion, updateQuestion, getMCQuestions } = require('../controller/question');

const router = require('express').Router();

router.get('/all', getQuestions);
router.get('/mcq', getMCQuestions);
router.get('/:id', getQuestion);
router.post('/', addQuestion);
router.delete('/:id', deleteQuestion);
router.patch('/:id', updateQuestion);

module.exports = router