import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Button from  "./components/shared/Button";

test('renders learn react link', () => {
  const testMessage = 'Test Message';
  render(<Button>{testMessage}</Button>)

});
