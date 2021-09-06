import { useState } from "react";
import { AnswerForm } from "../../components/AnswerForm/AnswerForm";
import { AnswerList } from "../../components/AnswerList/AnswerList";
import { Header } from "../../components/Header/Header";
import { AnswerEntity } from "../../interfaces/Answer";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [answers, setAnswers] = useState([] as AnswerEntity[]);

  const handleAnswerSubmit = (answer: AnswerEntity) => {
    setAnswers(previousAnswers => {
      previousAnswers.unshift(answer);
      return [...previousAnswers];
    });
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
    </div>
  );
};

export default HomePage;
