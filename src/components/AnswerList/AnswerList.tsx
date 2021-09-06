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
        answerList?.map(({ id, text }: AnswerEntity) => (
          <li key={id}>
            <span>{text}</span>
          </li>
        ))
      }
    </ul>
  );
};

export { AnswerList };