import { useContext, useEffect, useState } from 'react';

import { AnswerEntity } from '../../interfaces/Answer';
import { listAnswers } from '../../api/answer';
import { SocketContext, SocketListenEvents, UpdateAnswersArgs } from '../../context/SocketContext';

const AnswerList = () => {
  const { socket, isConnected }= useContext(SocketContext);

  const [answers, setAnswers] = useState([] as AnswerEntity[]);

  useEffect(() => {
    listAnswers().then(res => {
      setAnswers(res);
    });
  }, []);

  useEffect(() => {
    if (isConnected) {
      socket.on(
        SocketListenEvents.UPDATE_ANSWERS_LIST,
        ({ answersList }: UpdateAnswersArgs) => {
          setAnswers(answersList);
        }
      );
    }
  }, [socket, isConnected]);

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