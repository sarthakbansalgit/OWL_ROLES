import mongoose from 'mongoose';
import readline from 'readline';
import UserModel from './models/user.model.js'; 
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();


// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { 
            serverSelectionTimeoutMS: 20000, 
        });
        console.log('Connected to MongoDB');
        promptUser();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};


// Function to prompt user for details
const promptUser = () => {
    rl.question('Enter Full Name: ', (fullname) => {
        rl.question('Enter Email: ', (email) => {
            rl.question('Enter Phone Number: ', (phoneNumber) => {
                rl.question('Enter Password: ', async (password) => {
                    await createSuperUser(fullname, email, phoneNumber, password);
                    rl.close();
                    mongoose.connection.close();
                });
            });
        });
    });
};

// Function to create a superuser in the database
const createSuperUser = async (fullname, email, phoneNumber, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const superUser = new UserModel({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role: 'superUser',
        });
        
        await superUser.save();
        console.log('Superuser created successfully!');
    } catch (error) {
        console.error('Error creating superuser:', error);
    }
};

// Start the script by connecting to the database
connectDB();
