import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config({});

async function createDemoAccounts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Hash passwords
    const candidatePassword = await bcrypt.hash("Demo@123456", 10);
    const recruiterPassword = await bcrypt.hash("HR@123456", 10);

    // Check if accounts already exist
    const existingCandidate = await User.findOne({ email: "candidate@demo.com" });
    const existingRecruiter = await User.findOne({ email: "recruiter@demo.com" });

    if (existingCandidate) {
      console.log("⚠️  Candidate demo account already exists");
    } else {
      // Create candidate account
      const candidate = await User.create({
        fullname: "John Candidate",
        email: "candidate@demo.com",
        phoneNumber: 9876543210,
        password: candidatePassword,
        role: "student",
        profile: {
          bio: "Passionate software developer looking for new opportunities",
          skills: ["JavaScript", "React", "Node.js", "MongoDB"],
          resume: "",
          resumeOriginalName: "",
          profilePhoto: "",
        },
      });
      console.log("✅ Candidate Demo Account Created:");
      console.log("   Email: candidate@demo.com");
      console.log("   Password: Demo@123456");
      console.log("   Role: Candidate\n");
    }

    if (existingRecruiter) {
      console.log("⚠️  Recruiter demo account already exists");
    } else {
      // Create recruiter account
      const recruiter = await User.create({
        fullname: "Sarah HR",
        email: "recruiter@demo.com",
        phoneNumber: 9123456789,
        password: recruiterPassword,
        role: "recruiter",
        profile: {
          bio: "HR Manager at Tech Company",
          skills: ["Recruitment", "HR", "Team Management"],
          resume: "",
          resumeOriginalName: "",
          profilePhoto: "",
        },
      });
      console.log("✅ Recruiter Demo Account Created:");
      console.log("   Email: recruiter@demo.com");
      console.log("   Password: HR@123456");
      console.log("   Role: Recruiter\n");
    }

    console.log("================================");
    console.log("TEST ACCOUNTS READY FOR TESTING");
    console.log("================================\n");

    console.log("🔐 CANDIDATE ACCOUNT:");
    console.log("   Email: candidate@demo.com");
    console.log("   Password: Demo@123456\n");

    console.log("💼 RECRUITER ACCOUNT:");
    console.log("   Email: recruiter@demo.com");
    console.log("   Password: HR@123456\n");

    console.log("📝 How to test:");
    console.log("1. Go to http://localhost:5173/login");
    console.log("2. Select 'Candidate' and use candidate@demo.com / Demo@123456");
    console.log("3. Then test 'Recruiter' and use recruiter@demo.com / HR@123456\n");

    await mongoose.disconnect();
    console.log("✅ Script completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating demo accounts:", error);
    process.exit(1);
  }
}

createDemoAccounts();
