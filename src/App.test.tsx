import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render component', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});
