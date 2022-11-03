import { render } from '@testing-library/react';
import EventThumbnailComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';



test('renders EventThumbnailComponent container', () => {
  const { container } = render(
    <Router>
        <EventThumbnailComponent></EventThumbnailComponent>
    </Router>
  );
  expect(container.getElementsByClassName('EventThumbnailComponent').length).toBe(1);
});
