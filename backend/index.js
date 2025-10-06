import questionsRouter from './routes/questions.js';
import answerRouter from './routes/answer.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use('/', questionsRouter);
app.use('/', answerRouter);

app.listen(port, () => {
  console.log(`Mini Quiz App listening on port ${port}`)
});
