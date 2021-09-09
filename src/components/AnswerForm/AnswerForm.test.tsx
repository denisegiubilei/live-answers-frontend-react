import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SocketContextProvider } from '../../context/SocketContext';
import { SocketContextProviderMockError, SocketContextProviderMockSuccess } from '../../../__mocks__/SocketContextMock';

import { AnswerForm } from './AnswerForm';

const onSubmitMock = jest.fn();

describe('AnswerForm Component', () => {
  it('should render component', () => {
    const { container } = render(<AnswerForm onSubmit={onSubmitMock} />);

    expect(container).toBeDefined();
  });

  it('should render empty textarea, submit button and no error message', () => {
    const { container, queryByTestId } = render(<AnswerForm onSubmit={onSubmitMock} />);

    expect(queryByTestId("answer-field")).toHaveTextContent("");
    expect(queryByTestId("submit-button")).toHaveTextContent("Submit");

    expect(queryByTestId("error-message")).toBeNull();

    expect(container).toBeDefined();
  });

  it('should not submit form and show error message if try to submit with empty field', () => {
    const { getByTestId } = render(<AnswerForm onSubmit={onSubmitMock} />);

    const submitButton = getByTestId("submit-button");
    userEvent.click(submitButton);

    expect(getByTestId("error-message")).toHaveTextContent("Answer cannot be empty!");

    expect(onSubmitMock).not.toBeCalled();
  });

  it('should not submit form and show error message if try to submit with blank field', () => {
    const { getByTestId } = render(<AnswerForm onSubmit={onSubmitMock} />);

    fireEvent.change(getByTestId('answer-field'), { target: { value: '   ' } });

    const submitButton = getByTestId("submit-button");
    userEvent.click(submitButton);

    expect(getByTestId("error-message")).toHaveTextContent("Answer cannot be empty!");

    expect(onSubmitMock).not.toBeCalled();
  });

  it('should change button text to "Loading" when submiting valid text', async () => {
    const { getByTestId } = render(
      <SocketContextProvider>
        <AnswerForm onSubmit={onSubmitMock} />
      </SocketContextProvider>
    );

    fireEvent.change(getByTestId('answer-field'), { target: { value: "Valid answer!" } });

    const submitButton = getByTestId("submit-button");
    userEvent.click(submitButton);

    expect(submitButton).toHaveTextContent("Submiting...");
  });


  it('should call onSubmit when ws responds succesfully', async () => {
    const { getByTestId } = render(
      <SocketContextProviderMockSuccess>
        <AnswerForm onSubmit={onSubmitMock} />
      </SocketContextProviderMockSuccess >
    );

    fireEvent.change(getByTestId('answer-field'), { target: { value: "Valid answer!" } });

    const submitButton = getByTestId("submit-button");
    userEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('should not call onSubmit and display error message when ws responds error', async () => {
    const { getByTestId } = render(
      <SocketContextProviderMockError>
        <AnswerForm onSubmit={onSubmitMock} />
      </SocketContextProviderMockError >
    );

    fireEvent.change(getByTestId('answer-field'), { target: { value: "Valid answer!" } });

    const submitButton = getByTestId("submit-button");
    userEvent.click(submitButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(getByTestId("error-message")).toBeDefined();
  });
});