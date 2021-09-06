import { useState } from 'react';

const AnswerForm = () => {
  const [text, setText] = useState("");

  return (
    <section>
      <form>
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