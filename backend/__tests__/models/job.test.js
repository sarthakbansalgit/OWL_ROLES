import '../setup.js';
import mongoose from 'mongoose';
import Job from '../../models/job.model.js';

describe('Job Model Test', () => {
  const getUniqueJobData = () => ({
    title: `Software Engineer ${getTestId()}`,
    description: 'Building amazing software',
    requirements: ['Node.js', 'React'],
    salary: '80000',
    experienceLevel: 2,
    location: 'Remote',
    jobType: 'Full-time',
    position: 1,
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId()
  });

  it('should create & save job successfully', async () => {
    const validJob = new Job(getUniqueJobData());
    const savedJob = await validJob.save();
    
    expect(savedJob._id).toBeDefined();
    expect(savedJob.title).toBe(validJob.title);
    expect(savedJob.description).toBe(validJob.description);
    expect(savedJob.salary).toBe(validJob.salary);
    expect(savedJob.location).toBe(validJob.location);
  });

  it('should fail to save job without required fields', async () => {
    const jobWithoutRequiredField = new Job({ title: `Test Job ${getTestId()}` });
    let err;
    try {
      await jobWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save job with invalid company reference', async () => {
    const jobData = getUniqueJobData();
    jobData.company = 'invalid-id';
    const jobWithInvalidCompany = new Job(jobData);
    let err;
    try {
      await jobWithInvalidCompany.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});