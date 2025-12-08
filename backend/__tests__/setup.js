import mongoose from 'mongoose';
import { jest } from '@jest/globals';

// Use environment variables for test database
process.env.TEST_MONGO_URI = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/test';

// Mock Redis
jest.mock('../utils/cache.js', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  connect: jest.fn()
}));

// Mock cloudinary
jest.mock('../utils/cloudinary.js', () => ({
  uploader: {
    upload: jest.fn().mockResolvedValue({ secure_url: 'https://test-image-url.com' }),
    destroy: jest.fn()
  }
}));

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}));

// Mock datauri
jest.mock('../utils/datauri.js', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ content: 'mocked-content' })
}));

// Mock all mongoose models
jest.mock('../models/user.model.js', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn()
  }
}));

jest.mock('../models/company.model.js', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    countDocuments: jest.fn()
  }
}));

jest.mock('../models/job.model.js', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    countDocuments: jest.fn()
  }
}));

jest.mock('../models/application.model.js', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    countDocuments: jest.fn()
  }
}));

jest.mock('../models/blog.model.js', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    countDocuments: jest.fn()
  }
}));

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-for-testing-only';

// Connect to the test database before running tests
beforeAll(async () => {
  const testDbUri = process.env.TEST_MONGO_URI || process.env.MONGO_URI;
  await mongoose.connect(testDbUri);
});

// Helper function to generate unique test identifiers for test data isolation
global.getTestId = () => {
  return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Only clear mocks after each test, no data deletion
afterEach(async () => {
  jest.clearAllMocks();
});

// Disconnect after all tests
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});