import { render } from '@testing-library/react';
import EventDetailsComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders EventDetailsComponent container', () => {
  const { container } = render(
    <Router>
        <EventDetailsComponent></EventDetailsComponent>
    </Router>
  );
  expect(container.getElementsByClassName('EventDetailsComponent').length).toBe(1);
});
