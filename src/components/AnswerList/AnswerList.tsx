import { useEffect, useState } from 'react';

import { AnswerEntity } from '../../interfaces/Answer';
interface AnswerListProps {
  answers: AnswerEntity[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  const [answerList, setAnswerList] = useState(answers);

  useEffect(() => {
    setAnswerList(answers);
  }, [answers]);

  return (
    <ul>
      {
        answerList?.map(({ answers_id, answers_text }: AnswerEntity) => (
          <li key={answers_id}>
            <span>{answers_text}</span>
          </li>
        ))
      }
    </ul>
  );
};

export { AnswerList };