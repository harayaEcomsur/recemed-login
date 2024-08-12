import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('Muestra un error si el RUT es inválido', () => {
  render(<App />);
  const button = screen.getByText('Siguiente');
  fireEvent.click(button);
  expect(screen.getByText('RUT inválido')).toBeInTheDocument();
});
