import { render, screen } from '@testing-library/react';
import App from './App';

// Define una prueba para verificar que el enlace "learn react" se renderiza en el documento
test('renders learn react link', () => {
  render(<App />); // Renderiza el componente App
  const linkElement = screen.getByText(/learn react/i); // Busca un elemento que contenga el texto "learn react" (sin distinguir entre mayúsculas y minúsculas)
  expect(linkElement).toBeInTheDocument(); // Verifica que el elemento encontrado está presente en el documento
});
