import { useQuiz } from "../contexts/QuizContext";

export default function Options ()
{
  const { questions, index, answer, dispatch } = useQuiz();
  const question = questions.at(index);
  const { correctOption } = question;
  const hasAnswered = answer !== null;

  return (
    <article className="options">
      {
        question.options.map((option, i) =>
          <button
            className={`btn btn-option 
              ${i === answer ? 'answer' : ''} 
              ${hasAnswered
                ? (i === correctOption ? 'correct' : 'wrong')
                : ''}`
            }
            key={`${i}-${option}`}
            onClick=
            {() => dispatch(
              {
                type: 'newAnswer',
                payload: i, //индекс кнопки соответсвует индексу в массисе ответов (options)
              })
            }
            disabled={hasAnswered}
          >
            {option}
          </button>
        )
      }
    </article >
  );
}
