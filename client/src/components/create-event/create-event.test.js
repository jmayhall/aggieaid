import { render } from '@testing-library/react';
import CreateEventComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders CreateEventComponent container', () => {
  const { container } = render(
    <Router>
        <CreateEventComponent></CreateEventComponent>
    </Router>
  );
  expect(container.getElementsByClassName('CreateEventComponent').length).toBe(1);
});
