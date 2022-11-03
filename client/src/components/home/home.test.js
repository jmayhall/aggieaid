import { render } from '@testing-library/react';
import HomeComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders HomeComponent container', () => {
  const { container } = render(
    <Router>
        <HomeComponent></HomeComponent>
    </Router>
  );
  expect(container.getElementsByClassName('HomeComponent').length).toBe(1);
});
