import { render } from '@testing-library/react';
import LogoutComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders LogoutComponent container', () => {
  const { container } = render(
    <Router>
        <LogoutComponent></LogoutComponent>
    </Router>
  );
  expect(container.getElementsByClassName('LogoutComponent').length).toBe(1);
});
