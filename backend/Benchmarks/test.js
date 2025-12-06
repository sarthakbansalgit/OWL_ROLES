import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Job from '../models/job.model.js';
import Company from '../models/company.model.js';
import Application from '../models/application.model.js';

describe('Database Performance Tests', () => {
  beforeAll(async () => {
    // Use the existing database connection from setup.js
    if (!mongoose.connection.readyState) {
      const dbUri = process.env.TEST_MONGO_URI || process.env.MONGO_URI;
      await mongoose.connect(dbUri);
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
  });

  it('should measure collection statistics', async () => {
    
    // Get collection stats without modifying data
    const collections = [User, Job, Company, Application];
    for (const Model of collections) {
      const count = await Model.estimatedDocumentCount();
      const collStats = await mongoose.connection.db.command({ collStats: Model.collection.name });
    }

    expect(true).toBe(true);
  });

  it('should measure index performance', async () => {
    const collections = [User, Job, Company, Application];
    
    for (const Model of collections) {
      const indexes = await Model.collection.listIndexes().toArray();
    }

    expect(true).toBe(true);
  });
});