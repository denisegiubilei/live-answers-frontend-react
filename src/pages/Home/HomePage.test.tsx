import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import answers from '../../../__mocks__/answers';
import { SocketContextProviderMockSuccess } from '../../../__mocks__/SocketContextMock';

import HomePage from './HomePage';

window.open = jest.fn();

describe('HomePage Component', () => {

  it('should render component', async () => {
    const { container } = render(
      <HomePage />
    );
    expect(container).toBeDefined();
  });

  it('should render header title', async () => {
    const { getByText } = render(
      <HomePage />
    );

    expect(getByText("Is a hot dog a sandwich? Why?")).toBeDefined();
  });

  it('should save answer to localStorage and show it on My latests answers section', async () => {
    const { getByText, getByTestId } = render(
      <SocketContextProviderMockSuccess>
        <HomePage />
      </SocketContextProviderMockSuccess>
    );

    fireEvent.change(getByTestId('answer-field'), { target: { value: answers[0].text } });

    const submitButton = getByTestId("submit-button");

    userEvent.click(submitButton);

    await waitFor(() => expect(getByText("My latest answers")).toBeDefined());

    expect(getByTestId("answers-list")).toBeDefined();
    expect(getByText(answers[0].text)).toBeDefined();

    expect(window.localStorage.getItem("answers")).toContain(answers[0].text);

  });

  it('should handle click on see all asnwers button', async () => {
    const { getByText } = render(
      <HomePage />
    );

    fireEvent.click(getByText("See all answers"));
  });
});