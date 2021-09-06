import { useState } from "react";
import { AnswerForm } from "../../components/AnswerForm/AnswerForm";
import { AnswerList } from "../../components/AnswerList/AnswerList";
import { Header } from "../../components/Header/Header";
import { AnswerEntity } from "../../interfaces/Answer";

const HomePage = () => {
  const [answers, setAnswers] = useState([] as AnswerEntity[]);

  const handleAnswerSubmit = (answer: AnswerEntity) => {
    setAnswers(previousAnswers => {
      previousAnswers.unshift(answer);
      return [...previousAnswers];
    });
  };

  return (
    <>
      <Header title="Is a hot dog a sandwich? Why?" />
      <AnswerForm onSubmit={handleAnswerSubmit} />
      <AnswerList answers={answers} />
    </>
  );
};

export default HomePage;
