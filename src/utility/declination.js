export { pointsFn, questionFn };

//склонение по числам слова БАЛЛЫ
function pointsFn (num)
{
  const caseArr = [0, 1, 2, 2, 2];
  const declinationArr = ['баллов', 'балл', 'балла'];

  return declinationArr[
    num % 100 >= 11 && num % 100 <= 19
      ? 0
      : caseArr[num % 10 <= 4
        ? num % 10
        : 0
      ]

  ];
}

//склонение по числам слова ВОПРОСЫ
function questionFn (num)
{
  const caseArr = [0, 1, 2, 2, 2];
  const declinationArr = ['вопросов', 'вопрос', 'вопроса'];

  return declinationArr[
    num % 100 >= 11 && num % 100 <= 19
      ? 0
      : caseArr[num % 10 <= 4
        ? num % 10
        : 0
      ]

  ];
}