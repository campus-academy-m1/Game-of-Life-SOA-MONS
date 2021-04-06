import { render, screen } from '@testing-library/react';
import Main from './App';


describe('Test Jest Game of life', () => {
  test('should renders buttons play', () => {
    render(<Main />);
    const playElement = screen.getByTitle('Play');
    expect(playElement).toBeDefined();
  });

  test('should renders buttons pause', () => {
    render(<Main />);
    const pauseElement = screen.getByTitle('Pause');
    expect(pauseElement).toBeDefined();
  });

  test('should renders buttons clear', () => {
    render(<Main />);
    const clearElement = screen.getByTitle('Clear');
    expect(clearElement).toBeDefined();
  });

  test('should renders buttons fill', () => {
    render(<Main />);
    const fillElement = screen.getByTitle('Fill randomly (~1/8)');
    expect(fillElement).toBeDefined();
  });

  test('should renders buttons slow', () => {
    render(<Main />);
    const slowElement = screen.getByTitle('Slow');
    expect(slowElement).toBeDefined();
  });

  test('should renders buttons fast', () => {
    render(<Main />);
    const fastElement = screen.getByTitle('Fast');
    expect(fastElement).toBeDefined();
  });


  test('should renders title Game of Life - MONSOA', () => {
    render(<Main />);
    const linkElement = screen.getByText(/(Game of Life - MONSOA)/i);
    expect(linkElement).toBeInTheDocument();
  }); 
  
  
});