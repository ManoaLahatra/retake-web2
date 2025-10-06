import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import '../App.css'

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  const handleAnswer = (answer) => {
    setAnswered(true)
    fetch('http://localhost:3000/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: questions[current].id, answer })
    })
      .then(res => res.json())
      .then(data => {
        setCorrect(data.correct)
        setAnswers(a => [...a, answer])
        if (data.correct) setScore(s => s + 1)
      })
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setAnswered(false)
      setCorrect(false)
    } else {
      setFinished(true)
    }
  }

  if (questions.length === 0) return <div>Chargement...</div>
  if (finished) return (
    <div>
      <h2>Quiz terminé !</h2>
      <p>Score : {score} / {questions.length}</p>
    </div>
  )

  const q = questions[current]
  return (
    <div>
      <QuestionCard
        question={q.question}
        options={q.options}
        onAnswer={handleAnswer}
        answered={answered}
        correct={correct}
      />
      {answered && (
        <button onClick={handleNext}>
          {current + 1 < questions.length ? "Suivant" : "Voir le score"}
        </button>
      )}
      <p>Question {current + 1} / {questions.length}</p>
      <p>Score actuel : {score}</p>
    </div>
  )
}

export default Quiz;
