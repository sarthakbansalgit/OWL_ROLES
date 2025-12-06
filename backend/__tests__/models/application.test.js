import '../setup.js';
import mongoose from 'mongoose';
import Application from '../../models/application.model.js';

describe('Application Model Test', () => {
  const getUniqueApplicationData = () => ({
    job: new mongoose.Types.ObjectId(),
    applicant: new mongoose.Types.ObjectId(),
    status: 'pending'
  });

  it('should create & save application successfully', async () => {
    const validApplication = new Application(getUniqueApplicationData());
    const savedApplication = await validApplication.save();
    
    expect(savedApplication._id).toBeDefined();
    expect(savedApplication.status).toBe('pending');
    expect(savedApplication.job).toBeDefined();
    expect(savedApplication.applicant).toBeDefined();
  });

  it('should fail to save application without required fields', async () => {
    const applicationWithoutRequiredField = new Application({ status: 'pending' });
    let err;
    try {
      await applicationWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save application with invalid status', async () => {
    const applicationData = getUniqueApplicationData();
    applicationData.status = 'invalid-status';
    const applicationWithInvalidStatus = new Application(applicationData);
    let err;
    try {
      await applicationWithInvalidStatus.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});