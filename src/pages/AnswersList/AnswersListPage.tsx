import { useContext, useEffect, useState } from "react";

import { AnswerEntity } from "../../interfaces/Answer";
import { SocketContext, SocketListenEvents, UpdateAnswersArgs } from "../../context/SocketContext";
import { listAnswers } from "../../api/answer";

import { AnswerList } from "../../components/AnswerList/AnswerList";
import { Header } from "../../components/Header/Header";

import styles from './AnswersListPage.module.scss';
import { Loader } from "../../components/Loader/Loader";

const AnswersListPage = () => {
  const { socket, isConnected } = useContext(SocketContext);

  const [answers, setAnswers] = useState([] as AnswerEntity[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listAnswers().then(res => {
      setAnswers(res);
      setIsLoading(false);
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
    <div className={styles.AnswersListPage}>
      <Header title="Live answers" />
      {isLoading
        ? <Loader />
        : <AnswerList answers={answers} />
      }
    </div>
  );
};

export default AnswersListPage;
