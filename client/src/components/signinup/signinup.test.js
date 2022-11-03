import { render } from '@testing-library/react';
import SignInUpComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders SignInUpComponent container', () => {
  const { container } = render(
    <Router>
        <SignInUpComponent></SignInUpComponent>
    </Router>
  );
  expect(container.getElementsByClassName('SignInUpComponent').length).toBe(1);
});
