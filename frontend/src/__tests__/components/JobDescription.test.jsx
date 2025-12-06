import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock modules BEFORE importing components
vi.mock('react-redux', () => {
  const actual = require('react-redux');
  return {
    ...actual,
    useSelector: vi.fn().mockImplementation(selector => 
      selector({ 
        auth: { loading: false, user: null },
        job: { singleJob: null, loading: false }
      })
    ),
    useDispatch: () => vi.fn(),
    Provider: actual.Provider
  };
});

// Mock the fetch function
global.fetch = vi.fn();

// Import component AFTER mocks
import JobDescription from '../../components/JobDescription';

describe('JobDescription Component', () => {
  beforeEach(() => {
    fetch.mockReset();
    vi.clearAllMocks();
  });

  it('renders job description component', () => {
    render(
      <MemoryRouter initialEntries={['/description/1']}>
        <Routes>
          <Route path="/description/:id" element={<JobDescription />} />
        </Routes>
      </MemoryRouter>
    );
    // Just check for some basic structure
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
}); 