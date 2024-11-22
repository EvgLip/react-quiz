import { useQuiz } from "../contexts/QuizContext";

export default function Question ({ children })
{
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <section>
      <h4>{question.question}</h4>
      {children}
    </section>
  );
}
