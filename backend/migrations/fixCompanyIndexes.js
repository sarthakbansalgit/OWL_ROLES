import mongoose from 'mongoose';
import Company from '../models/company.model.js';

async function fixCompanyIndexes() {
    try {
        // Connect to MongoDB using the connection string
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cubicals';
        await mongoose.connect(mongoUri);
        
        console.log('Connected to MongoDB');
        
        // Drop the old unique index on name
        try {
            await Company.collection.dropIndex('name_1');
            console.log('✅ Dropped old unique index on "name"');
        } catch (error) {
            if (error.code === 27) {
                console.log('ℹ️ Index does not exist (already dropped)');
            } else {
                console.error('Error dropping index:', error.message);
            }
        }
        
        // Create the new compound unique index on name and userId
        try {
            await Company.collection.createIndex(
                { name: 1, userId: 1 },
                { unique: true, sparse: true }
            );
            console.log('✅ Created new compound unique index on (name, userId)');
        } catch (error) {
            console.error('Error creating index:', error.message);
        }
        
        console.log('✅ Index migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during migration:', error);
        process.exit(1);
    }
}

fixCompanyIndexes();
