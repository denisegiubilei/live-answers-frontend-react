import { render } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('should render component', () => {
    const { container } = render(<Loader />);

    expect(container).toBeDefined();
  });
});
