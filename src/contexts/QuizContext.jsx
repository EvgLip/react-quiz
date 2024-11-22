// QuizContext
import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

//объект с данными управляющими состоянием приложения
const initialState = {
  questions: [], //заполняется объектами с вопросами, но в случае 'dataFailed' заполнено ошибкой
  //ЗНАЧЕНИЯ СВОЙСТВА status:
  //'loading' - состояние по умолчанию
  //'error' - ошибка
  //'ready' - данные загружены с сервера
  //'active' - тест запущен
  //'finished' - тест завершен
  status: 'loading',
  index: 0, //указывает на вопрос, кот должен быть отображен на экране  
  answer: null, //номер ответа  
  points: 0,  //баллы за ответы  
  secondsRemaining: 15 * 30,  // кол-во секунд на выполнение теста
};

function reducer (state, action)
{
  switch (action.type)
  {
    //в QuizProvider.useEffect
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    //в useEffect
    case 'dataFailed':
      return {
        ...state,
        questions: [action.payload],
        status: 'error',
      };
    //в <StartScreen />
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    //в <Options />
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + Number(question.points)
          : state.points,
      };
    //в <NextButton />
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    //в <NextButton />
    case 'finish':
      return {
        ...state,
        status: 'finished'
      };
    //в <FinishScreen />
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    //в <Timer />
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default: throw new Error('Неизвестное действие' + action.type);
  }
}

function QuizProvider ({ children })
{
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions, //массив объектов с вопросами
    status, //статус программы
    index,  //индекс вопроса в массисе
    answer, //номер ответа
    points, //кол-во баллов за ответы (суммируются)
    secondsRemaining, //оставшиеся секунды до завершения теста
  } = state;
  const numQuestions = questions?.length ?? '';
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0);

  //извлечение данных 
  //установление status='ready'
  useEffect(function ()
  {
    async function getQuestions ()
    {
      try
      {
        const resp = await fetch('http://localhost:8000/questions');
        const data = await resp.json();
        dispatch(
          {
            type: 'dataReceived',
            payload: data,
          });
      } catch (error)
      {
        dispatch({ type: 'dataFailed', payload: error.message });
      }
    }

    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={
        {
          questions, //массив объектов с вопросами
          status, //статус программы
          index,  //индекс вопроса в массисе
          answer, //номер ответа
          points, //кол-во баллов за ответы (суммируются)
          secondsRemaining, //оставшиеся секунды до завершения теста
          numQuestions, //общее кол-во вопросов
          maxPossiblePoints, //максимально возможное кол-во очков
          dispatch //диспетчерская функция
        }
      }
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz ()
{
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error('QuizContext используется вне QuizProvider');

  return context;
}

export { QuizProvider, useQuiz, };