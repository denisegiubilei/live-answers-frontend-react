import { render } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage Component', () => {
  it('should render component', () => {
    const { container } = render(<ErrorMessage message="" />);

    expect(container).toBeDefined();
  });

  it('should render message as a text on component', () => {
    const message = "Unit test - error message";

    const { getByTestId } = render(<ErrorMessage message={message} />);

    expect(getByTestId("error-message")).toHaveTextContent(message);
  });
});
