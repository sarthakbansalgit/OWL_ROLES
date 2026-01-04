import mongoose from 'mongoose';
import Company from './models/company.model.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const cleanupCompanies = async () => {
  try {
    console.log('\n🧹 Starting company cleanup...\n');

    // Find all companies without userId or with null/undefined userId
    const companiesWithoutUserId = await Company.find({
      $or: [
        { userId: { $exists: false } },
        { userId: null },
        { userId: undefined }
      ]
    });

    console.log(`Found ${companiesWithoutUserId.length} companies without userId:`);
    companiesWithoutUserId.forEach((company) => {
      console.log(`  - ${company.name} (ID: ${company._id})`);
    });

    if (companiesWithoutUserId.length === 0) {
      console.log('\n✓ No companies to clean up!');
      await mongoose.connection.close();
      return;
    }

    // Delete companies without userId
    const result = await Company.deleteMany({
      $or: [
        { userId: { $exists: false } },
        { userId: null },
        { userId: undefined }
      ]
    });

    console.log(`\n✓ Deleted ${result.deletedCount} companies without userId`);

    // Show remaining companies
    const remainingCompanies = await Company.find({}).select('name userId');
    console.log(`\n✓ Remaining companies (${remainingCompanies.length}):`);
    remainingCompanies.forEach((company) => {
      console.log(`  - ${company.name} (Owner: ${company.userId})`);
    });

    console.log('\n✓ Cleanup complete!\n');
    await mongoose.connection.close();
  } catch (error) {
    console.error('✗ Cleanup failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run cleanup
connectDB().then(() => {
  cleanupCompanies();
});
