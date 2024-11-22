import React from 'react';
import { useQuiz } from "../contexts/QuizContext";

export default function NextButton ()
{
  const { answer, dispatch, index, numQuestions } = useQuiz();

  if (answer === null) return;

  if (index === numQuestions - 1)
  {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Готово
      </button>
    );
  }

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Далее
    </button>
  );

}
