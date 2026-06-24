import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renderiza navbar y rutas principales', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Verifica que exista el navbar (role="navigation")
  const nav = screen.getByRole('navigation');
  expect(nav).toBeInTheDocument();
});