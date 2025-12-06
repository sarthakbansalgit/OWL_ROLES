import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock React Redux
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  const mockStore = {
    job: {
      allJobs: [],
      searchedQuery: '',
      singleJob: null
    },
    auth: {
      user: null,
      loading: false
    }
  };
  
  return {
    ...actual,
    useSelector: vi.fn().mockImplementation(selector => selector(mockStore)),
    useDispatch: () => vi.fn()
  };
});

// Mock React Router DOM
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: 'test-id' }),
    useLocation: () => ({ pathname: '/' })
  };
});

// Mock custom hooks
vi.mock('@/hooks/useGetAllJobs', () => ({
  default: vi.fn()
}));

// Mock redux store initial state
vi.mock('@/redux/jobSlice', () => ({
  setSearchedQuery: vi.fn(),
  setLoading: vi.fn(),
  setJobs: vi.fn(),
  default: vi.fn()
}));

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

// Browser APIs
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

window.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});