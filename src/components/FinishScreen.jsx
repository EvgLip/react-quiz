import React from 'react';
import { useQuiz } from "../contexts/QuizContext";
import { pointsFn } from '../utility/declination';

export default function FinishScreen ()
{
  const { points, maxPossiblePoints, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <div className='result'>
        <p>
          Вы набрали <strong>{points}</strong> {pointsFn(points)} ({Math.ceil(percentage)}%)
        </p>
        <p>
          из максимально возможных {maxPossiblePoints} {pointsFn(maxPossiblePoints)}
        </p>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Начать сначала
      </button>
    </>
  );
}
