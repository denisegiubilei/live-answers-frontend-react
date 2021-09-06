import { useEffect, useState } from 'react';
import { listAnswers } from '../../api/answer';

interface AnswerEntity {
  answers_id: string;
  answers_text: string;
  answers_created_at?: Date;
}

const AnswerList = () => {
  const [answers, setAnswers] = useState([] as AnswerEntity[]);

  useEffect(() => {
    listAnswers().then(res => {
      setAnswers(res);
    });
  }, []);

  return (
    <section>
      <h2>Live Answers</h2>
      <ul>
        {
          answers?.map(({ answers_id, answers_text }: AnswerEntity) => (
            <li key={answers_id}>
              <span>{answers_text}</span>
            </li>
          ))
        }
      </ul>
    </section >
  );
};

export { AnswerList };