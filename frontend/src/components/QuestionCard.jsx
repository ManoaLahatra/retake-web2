import '../App.css'

function QuestionCard({ question, options, onAnswer, answered, correct }) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map(opt => (
        <label key={opt}>
          <input
            type="radio"
            name={question}
            value={opt}
            disabled={answered}
            onChange={() => onAnswer(opt)}
          />
          {opt}
        </label>
      ))}
      {answered && (
        <div>
          {correct ? "Bonne réponse !" : "Mauvaise reponse."}
        </div>
      )}
    </div>
  )
}

export default QuestionCard;
