import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders App container', () => {
  const { container } = render(
    <Router>
      <App />
    </Router>
  );
  expect(container.getElementsByClassName('App').length).toBe(1);
});
