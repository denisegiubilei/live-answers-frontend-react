import { render } from '@testing-library/react';
import { AnswerList } from './AnswerList';

import answers from '../../../__mocks__/answers';

describe('AnswerList Component', () => {
  it('should render component', () => {
    const { container } = render(<AnswerList answers={[]} />);

    expect(container).toBeDefined();
  });

  it('should render answers in a list, an answer per list item', () => {
    const { getAllByRole } = render(<AnswerList answers={answers} />);

    const listItems = getAllByRole("listitem");

    expect(listItems.length).toEqual(answers.length);

    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(answers[index].text);
    });
  });
});
