import { render } from '@testing-library/react';
import EventsListComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders EventsListComponent container', () => {
  const { container } = render(
    <Router>
        <EventsListComponent></EventsListComponent>
    </Router>
  );
  expect(container.getElementsByClassName('EventsListComponent').length).toBe(1);
});
