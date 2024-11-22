import React from 'react';
import { useQuiz } from "../contexts/QuizContext";
import { questionFn } from '../utility/declination';

export default function StartScreen ()
{
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>
        <span>Добро пожаловать на тест</span>
        <span>по React</span>
      </h2>
      <h3>
        <span>Ответьте на {numQuestions} {questionFn(numQuestions)}</span>
        <span>для проверки Вашего мастерства в React</span>
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Давайте начнем
      </button>
    </div>
  );
}
