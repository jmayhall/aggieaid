import { render } from '@testing-library/react';
import AboutUsComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders AboutUsComponent container', () => {
  const { container } = render(
    <Router>
        <AboutUsComponent></AboutUsComponent>
    </Router>
  );
  expect(container.getElementsByClassName('AboutUsComponent').length).toBe(1);
});
