import { FormEvent, useContext, useState } from 'react';

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
    }

    if (answer) {
      onSubmit(answer);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      text: { value: string };
    };

    const text = target.text.value?.trim();

    if (text) {
      setIsLoading(true);
      emmitEvent(SocketEmmitEvents.USER_ANSWERED, { text }, handleCallback);
    } else {
      setError("Answer cannot be empty!");
    }
  };

  return (
    <section className={styles.AnswerForm}>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea rows={4} name="text" value={text} onChange={(e) => setText(e.target.value)} />
          {error && <ErrorMessage message={error} />}
        </div>
        <button type="submit">
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