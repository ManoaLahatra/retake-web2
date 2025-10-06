import { Router } from "express";
import questions from "../QuestionList.js";

const questionsRouter = Router();

questionsRouter.get('/questions', (req, res) => {
    res.json(questions.map(({ id, question, options, correctAnswer }) => ({ id, question, options, correctAnswer })));
});

export default questionsRouter;
