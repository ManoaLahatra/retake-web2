import { Router } from 'express';
import questions from '../QuestionList.js';

const answerRouter = Router();

answerRouter.post('/answer', (req, res) => {
    const { questionId, answer } = req.body;
    const question = questions.find(q => q.id === questionId);

    if (!question) {
        return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = question.correctAnswer === answer;
    res.json({ correct: isCorrect });
});

export default answerRouter;
