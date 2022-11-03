import { render } from '@testing-library/react';
import EventResultComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders EventResultComponent container', () => {
  const { container } = render(
    <Router>
        <EventResultComponent></EventResultComponent>
    </Router>
  );
  expect(container.getElementsByClassName('EventResultComponent').length).toBe(1);
});
