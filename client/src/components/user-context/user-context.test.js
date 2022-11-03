import { render } from '@testing-library/react';
import UserContextComponnent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders UserContextComponnent container', () => {
  const { container } = render(
    <Router>
        <UserContextComponnent></UserContextComponnent>
    </Router>
  );
  expect(container.getElementsByClassName('UserContextComponent').length).toBe(1);
});
