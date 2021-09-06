import { useContext, useEffect, useState } from 'react';

import { listAnswers } from '../../api/answer';
import { SocketContext, SocketListenEvents } from '../../context/SocketContext';

interface AnswerEntity {
  answers_id: string;
  answers_text: string;
  answers_created_at?: Date;
}

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
        (args: any) => {
          console.log(args);
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