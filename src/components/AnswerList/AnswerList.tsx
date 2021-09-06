import { useEffect, useState } from 'react';

import { AnswerEntity } from '../../interfaces/Answer';

import styles from './AnswerList.module.scss';
interface AnswerListProps {
  answers: AnswerEntity[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  const [answerList, setAnswerList] = useState(answers);

  useEffect(() => {
    setAnswerList(answers);
  }, [answers]);

  return (
    <ul className={styles.AnswerList}>
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