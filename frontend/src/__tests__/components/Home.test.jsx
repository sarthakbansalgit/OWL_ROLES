import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../components/Home';
import { beforeAll } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

beforeAll(() => {
  const { warn } = console
  const deprecatedMessages = [
    'ReactDOM.render is no longer supported',
    'componentWillReceiveProps has been renamed'
  ]
  
  console.warn = (...args) => {
    if (deprecatedMessages.some(msg => args[0].includes(msg))) return
    warn(...args)
  }
})

const mockStore = configureStore([]);

const store = mockStore({
  auth: {
    user: null,
    loading: false
  }
});

describe('Home Component', () => {
  it('renders hero section correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    
    expect(await screen.findByRole('heading', { 
      name: /Transform Your Career Journey/i 
    })).toBeInTheDocument();
    
    expect(await screen.findByTestId('try-pro-button', {}, { timeout: 3000 })).toBeInTheDocument();
    
    expect(await screen.findByRole('link', { 
      name: /Try Pro →/i 
    })).toBeInTheDocument();
  });
}); 