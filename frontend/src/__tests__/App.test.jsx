import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock react-redux
vi.mock('react-redux', () => {
  const actual = require('react-redux');
  return {
    ...actual,
    useSelector: vi.fn().mockImplementation(selector => 
      selector({ 
        auth: { loading: false, user: null },
        job: { allJobs: [], searchedQuery: '', singleJob: null, loading: false }
      })
    ),
    useDispatch: () => vi.fn(),
    Provider: actual.Provider
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Find the first Owl Roles heading specifically
    expect(screen.getAllByText('Owl Roles')[0]).toBeInTheDocument();
  });
}); 