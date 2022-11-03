import { render } from '@testing-library/react';
import RegisterComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders RegisterComponent container', () => {
  const { container } = render(
    <Router>
        <RegisterComponent></RegisterComponent>
    </Router>
  );
  expect(container.getElementsByClassName('RegisterComponent').length).toBe(1);
});
