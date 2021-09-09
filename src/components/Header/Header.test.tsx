import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('should render component', () => {
    const { container } = render(<Header title="" />);

    expect(container).toBeDefined();
  });

  it('should render title in h1 tag', () => {
    const title = "Unit test - title";

    const { getByRole } = render(<Header title={title} />);

    expect(getByRole("heading")).toHaveTextContent(title);
  });
});
