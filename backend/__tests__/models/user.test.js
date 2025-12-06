import '../setup.js';
import mongoose from 'mongoose';
import User from '../../models/user.model.js';

describe('User Model Test', () => {
  const getUniqueUserData = () => ({
    fullname: `Test User ${getTestId()}`,
    email: `test.${getTestId()}@example.com`,
    phoneNumber: 1234567890,
    password: 'Password@123',
    role: 'student'
  });

  it('should create & save user successfully', async () => {
    const validUser = new User(getUniqueUserData());
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.fullname).toBe(validUser.fullname);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.phoneNumber).toBe(validUser.phoneNumber);
    expect(savedUser.role).toBe(validUser.role);
  });

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new User({ fullname: `Test User ${getTestId()}` });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save user with invalid email format', async () => {
    const userData = getUniqueUserData();
    userData.email = 'invalid-email';
    const userWithInvalidEmail = new User(userData);
    await expect(userWithInvalidEmail.save()).rejects.toThrow();
  });

  it('should fail to save user with invalid role', async () => {
    const userData = getUniqueUserData();
    userData.role = 'invalid-role';
    const userWithInvalidRole = new User(userData);
    let err;
    try {
      await userWithInvalidRole.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});