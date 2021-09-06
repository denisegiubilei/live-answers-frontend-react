import { FormEvent, useState } from 'react';

import { submitAnswer } from '../../api/answer';

const AnswerForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      text: { value: string };
    };

    const text = target.text.value?.trim();

    submitAnswer(text)
      .then((res) => {
        console.log(res);
      })
      .catch((error => {
        console.log(error.message);
      }));
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