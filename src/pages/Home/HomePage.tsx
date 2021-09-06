import { useState } from "react";

import { AnswerForm } from "../../components/AnswerForm/AnswerForm";
import { AnswerList } from "../../components/AnswerList/AnswerList";
import { Header } from "../../components/Header/Header";
import { AnswerEntity } from "../../interfaces/Answer";

import styles from "./HomePage.module.scss";

const localAnswers = JSON.parse(window.localStorage.getItem("answers") || "[]");

const HomePage = () => {
  const [answers, setAnswers] = useState([...localAnswers] as AnswerEntity[]);

  const handleClickLiveAnswers = () => {
    window.open(`${window.location.href}answers`, '_blank');
  };

  const handleAnswerSubmit = (answer: AnswerEntity) => {
    setAnswers(previousAnswers => {
      previousAnswers.unshift(answer);
      return [...previousAnswers];
    });

    updateLocalStorage(answer);
  };

  const updateLocalStorage = (answer: AnswerEntity) => {
    localAnswers.unshift(answer);
    window.localStorage.setItem("answers", JSON.stringify(localAnswers));
  };

  return (
    <div className={styles.HomePage}>
      <Header title="Is a hot dog a sandwich? Why?" />
      <AnswerForm onSubmit={handleAnswerSubmit} />
      {answers.length > 0 && (
        <>
          <h2>My latest answers</h2>
          <AnswerList answers={answers} />
        </>
      )}
      <button onClick={handleClickLiveAnswers}>See all answers</button>
    </div>
  );
};

export default HomePage;
