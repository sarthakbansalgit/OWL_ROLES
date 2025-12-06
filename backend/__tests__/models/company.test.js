import '../setup.js';
import mongoose from 'mongoose';
import Company from '../../models/company.model.js';

describe('Company Model Test', () => {
  const getUniqueCompanyData = () => ({
    name: `Test Company ${getTestId()}`,
    description: 'A test company',
    website: `https://test-${getTestId()}.com`,
    location: 'Test Location',
    userId: new mongoose.Types.ObjectId()
  });

  it('should create & save company successfully', async () => {
    const validCompany = new Company(getUniqueCompanyData());
    const savedCompany = await validCompany.save();
    
    expect(savedCompany._id).toBeDefined();
    expect(savedCompany.name).toBe(validCompany.name);
    expect(savedCompany.description).toBe(validCompany.description);
    expect(savedCompany.website).toBe(validCompany.website);
    expect(savedCompany.location).toBe(validCompany.location);
  });

  it('should fail to save company without required fields', async () => {
    const companyWithoutRequiredField = new Company({ name: `Test Company ${getTestId()}` });
    let err;
    try {
      await companyWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save company with invalid userId reference', async () => {
    const companyData = getUniqueCompanyData();
    companyData.userId = 'invalid-id';
    const companyWithInvalidUserId = new Company(companyData);
    let err;
    try {
      await companyWithInvalidUserId.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});