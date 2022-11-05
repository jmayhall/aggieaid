import { render } from '@testing-library/react';
import VerifyEmailComponent from '.';
import { MemoryRouter as Router } from 'react-router-dom';


test('renders VerifyEmailComponent container', () => {
  const { container } = render(
    <Router>
        <VerifyEmailComponent></VerifyEmailComponent>
    </Router>
  );
  expect(container.getElementsByClassName('VerifyEmailComponent').length).toBe(1);
});
