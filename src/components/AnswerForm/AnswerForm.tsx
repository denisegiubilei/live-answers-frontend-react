import { ChangeEvent, useContext, useState } from 'react';

import { SocketContext, SocketEmmitEvents, EmmitCallbackParam } from '../../context/SocketContext';
import { AnswerEntity } from '../../interfaces/Answer';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

import styles from './AnswerForm.module.scss';

interface AnswerFormProps {
  onSubmit: (answer: AnswerEntity) => void;
}

const AnswerForm = ({ onSubmit }: AnswerFormProps) => {
  const { emmitEvent } = useContext(SocketContext);

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCallback: EmmitCallbackParam = ({ error, answer }) => {
    if (error) {
      setError(error);
    } else {
      setError("");
    }

    if (answer) {
      onSubmit(answer);
      setText("");
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = e.currentTarget.elements as typeof e.currentTarget.elements & {
      text: { value: string };
    };

    const submitedText = payload.text.value.trim();

    if (submitedText) {
      setIsLoading(true);
      emmitEvent(SocketEmmitEvents.USER_ANSWERED, { text: submitedText }, handleCallback);
    } else {
      setError("Answer cannot be empty!");
    }
  };

  return (
    <section className={styles.AnswerForm}>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            required
            data-testid="answer-field"
            inputMode="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {error && <ErrorMessage message={error} />}
        </div>
        <button data-testid="submit-button" type="submit">
          {isLoading ? (
            <span>Submiting...</span>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </section>
  );
};

export { AnswerForm };