import { render } from '@testing-library/react';
import FindEventComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders FindEventComponent container', () => {
  const { container } = render(
    <Router>
        <FindEventComponent></FindEventComponent>
    </Router>
  );
  expect(container.getElementsByClassName('FindEventComponent').length).toBe(1);
});
