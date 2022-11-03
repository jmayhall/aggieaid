import { render } from '@testing-library/react';
import LoginComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders LoginComponent container', () => {
  const { container } = render(
    <Router>
        <LoginComponent></LoginComponent>
    </Router>
  );
  expect(container.getElementsByClassName('LoginComponent').length).toBe(1);
});
