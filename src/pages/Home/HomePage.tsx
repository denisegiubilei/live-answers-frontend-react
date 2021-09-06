import { AnswerForm } from "../../components/AnswerForm/AnswerForm";
import { Header } from "../../components/Header/Header";
import { AnswerEntity } from "../../interfaces/Answer";

const HomePage = () => {
  return (
    <>
      <Header title="Is a hot dog a sandwich? Why?" />
      <AnswerForm onSubmit={(answer: AnswerEntity) => console.log(answer)}/>
    </>
  );
};

export default HomePage;
