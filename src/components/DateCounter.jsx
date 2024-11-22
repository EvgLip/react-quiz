import { useReducer } from "react";
/*--------------------------------*/

//объект контролирующий состояние компонента
//count - количество дней
//step - шаг, с которым изменяееся count = count + step
const initialState = { count: 0, step: 1 };

export default function DateCounter ()
{
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => dispatch({ type: 'defineStep', payload: Number(e.target.value) })}
        />
        <span>{step}</span>
      </div>

      <div>
        <button
          onClick={() => dispatch({ type: 'decCount' })}>
          -<span>{step}</span>
        </button>
        <input
          value={count}
          onChange={(e) => dispatch({ type: 'defineCount', payload: Number(e.target.value) })}
        />
        <button
          onClick={() => dispatch({ type: 'incCount' })}>
          +<span>{step}</span>
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button
          onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </button>
      </div>
    </div>
  );
}

//логика состояния
function reducer (state, action)
{
  switch (action.type)
  {
    case 'incCount':
      return { ...state, count: state.count + state.step };
    case 'decCount':
      return { ...state, count: state.count - state.step };
    case 'defineCount':
      return { ...state, count: action.payload };
    case 'defineStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Неизвестное действие: ' + action.type);
  }
}

