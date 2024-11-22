import { useQuiz } from "../contexts/QuizContext";

function Error ()
{
  const { questions: [message] } = useQuiz();

  return (
    <div className="error">
      <span>💥</span>
      <span>Произошла ошибка при загрузке вопросов.</span>
      <p>({message})</p>
      <p>Проверьте, запущен ли json-server.</p>
    </div>
  );
}

export default Error;
