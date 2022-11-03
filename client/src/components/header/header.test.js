import { render } from '@testing-library/react';
import HeaderComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders HeaderComponent container', () => {
  const { container } = render(
    <Router>
        <HeaderComponent></HeaderComponent>
    </Router>
  );
  expect(container.getElementsByClassName('HeaderComponent').length).toBe(1);
});
