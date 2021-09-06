import { FormEvent, useContext, useState } from 'react';

import { SocketContext, SocketEmmitEvents, EmmitCallbackParam } from '../../context/SocketContext';

const AnswerForm = () => {
  const { emmitEvent } = useContext(SocketContext);

  const [text, setText] = useState("");

  const handleCallback: EmmitCallbackParam = ({ error, answer }) => {
    if (error) {
      console.log(error);
    }

    if (answer) {
      console.log(answer);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      text: { value: string };
    };

    const text = target.text.value?.trim();

    emmitEvent(SocketEmmitEvents.USER_ANSWERED, { text }, handleCallback);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export { AnswerForm };