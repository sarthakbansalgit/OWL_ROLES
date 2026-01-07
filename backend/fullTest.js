import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Company from "./models/company.model.js";
import Job from "./models/job.model.js";
import Application from "./models/application.model.js";

dotenv.config({});

async function runFullTest() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // ==================== STEP 1: CREATE HR/RECRUITER ====================
    console.log("📋 STEP 1: Creating HR/Recruiter Account...");
    const hrPassword = await bcrypt.hash("Recruiter@123", 10);
    const hr = await User.create({
      fullname: "Alice HR Manager",
      email: "alice.hr@test.com",
      phoneNumber: 9876543210,
      password: hrPassword,
      role: "recruiter",
      profile: { bio: "Experienced HR Manager" },
      isFirstLogin: true,
    });
    console.log("✅ HR Created:", hr.email, "ID:", hr._id.toString());

    // ==================== STEP 2: CREATE COMPANY ====================
    console.log("\n💼 STEP 2: Creating Company...");
    const company = await Company.create({
      name: "Tech Innovations Inc",
      description: "Leading AI and tech solutions company",
      website: "https://techinnovations.com",
      location: "San Francisco, CA",
      userId: hr._id,
    });
    console.log("✅ Company Created:", company.name, "ID:", company._id.toString());

    // ==================== STEP 3: CREATE JOB ====================
    console.log("\n📝 STEP 3: Creating Job Posting...");
    const job = await Job.create({
      title: "Senior React Developer",
      description: "We are looking for experienced React developers with 5+ years",
      requirements: ["5+ years React", "Node.js", "MongoDB"],
      salary: "120000-150000",
      jobType: "Full-time",
      experienceLevel: 5,
      position: 3,
      location: "San Francisco, CA",
      company: company._id,
      created_by: hr._id,
    });
    console.log("✅ Job Created:", job.title, "ID:", job._id.toString());

    // ==================== STEP 4: CREATE CANDIDATE ====================
    console.log("\n👤 STEP 4: Creating Candidate Account...");
    const candidatePassword = await bcrypt.hash("Candidate@123", 10);
    const candidate = await User.create({
      fullname: "Bob Developer",
      email: "bob.dev@test.com",
      phoneNumber: 8765432109,
      password: candidatePassword,
      role: "student",
      profile: {
        bio: "Full stack developer",
        skills: ["React", "Node.js", "MongoDB", "JavaScript"],
      },
      isFirstLogin: true,
    });
    console.log("✅ Candidate Created:", candidate.email, "ID:", candidate._id.toString());

    // ==================== STEP 5: CANDIDATE APPLIES TO JOB ====================
    console.log("\n📤 STEP 5: Candidate Applying to Job...");
    const application = await Application.create({
      job: job._id,
      applicant: candidate._id,
      status: "pending",
    });
    console.log("✅ Application Created:", application._id.toString(), "Status: pending");

    // ==================== STEP 6: RETRIEVE DATA ====================
    console.log("\n📊 STEP 6: Verifying Data...");
    
    // Check job visibility
    const jobFromDb = await Job.findById(job._id).populate("company", "name");
    console.log("✅ Job Found:", jobFromDb.title, "Company:", jobFromDb.company.name);

    // Check applications for HR
    const applicationsForHr = await Application.find({ job: job._id })
      .populate("applicant", "fullname email");
    console.log("✅ Applications for this job:", applicationsForHr.length);
    applicationsForHr.forEach(app => {
      console.log(`   - ${app.applicant.fullname} (${app.applicant.email})`);
    });

    // ==================== STEP 7: HR ACCEPTS APPLICATION ====================
    console.log("\n✅ STEP 7: HR Accepting Application...");
    const updatedApplication = await Application.findByIdAndUpdate(
      application._id,
      { status: "accepted" },
      { new: true }
    );
    console.log("✅ Application Status Updated to:", updatedApplication.status);

    // ==================== STEP 8: CREATE SECOND CANDIDATE & REJECT ====================
    console.log("\n👤 STEP 8: Creating Second Candidate...");
    const candidate2Password = await bcrypt.hash("Candidate@456", 10);
    const candidate2 = await User.create({
      fullname: "Charlie Developer",
      email: "charlie.dev@test.com",
      phoneNumber: 7654321098,
      password: candidate2Password,
      role: "student",
      profile: {
        bio: "Junior developer",
        skills: ["JavaScript", "HTML", "CSS"],
      },
      isFirstLogin: true,
    });
    console.log("✅ Candidate 2 Created:", candidate2.email);

    console.log("\n📤 Candidate 2 Applying to Job...");
    const application2 = await Application.create({
      job: job._id,
      applicant: candidate2._id,
      status: "pending",
    });
    console.log("✅ Application 2 Created:", application2._id.toString());

    console.log("\n❌ STEP 9: HR Rejecting Application 2...");
    const rejectedApplication = await Application.findByIdAndUpdate(
      application2._id,
      { status: "rejected" },
      { new: true }
    );
    console.log("✅ Application 2 Status Updated to:", rejectedApplication.status);

    // ==================== FINAL REPORT ====================
    console.log("\n" + "=".repeat(70));
    console.log("✅ FULL END-TO-END TEST COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(70));

    console.log("\n📋 TEST ACCOUNTS CREATED:");
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    HR/RECRUITER ACCOUNT                    ║
╠════════════════════════════════════════════════════════════╣
║ Email:       alice.hr@test.com                             ║
║ Password:    Recruiter@123                                 ║
║ Company:     Tech Innovations Inc                          ║
║ Job Posted:  Senior React Developer                        ║
║ Location:    San Francisco, CA                             ║
╚════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════╗
║                  CANDIDATE 1 - ACCEPTED ✅                ║
╠════════════════════════════════════════════════════════════╣
║ Name:        Bob Developer                                 ║
║ Email:       bob.dev@test.com                              ║
║ Password:    Candidate@123                                 ║
║ Skills:      React, Node.js, MongoDB, JavaScript           ║
║ Application: ACCEPTED                                      ║
╚════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════╗
║                  CANDIDATE 2 - REJECTED ❌                ║
╠════════════════════════════════════════════════════════════╣
║ Name:        Charlie Developer                             ║
║ Email:       charlie.dev@test.com                          ║
║ Password:    Candidate@456                                 ║
║ Skills:      JavaScript, HTML, CSS                         ║
║ Application: REJECTED                                      ║
╚════════════════════════════════════════════════════════════╝
    `);

    console.log("=".repeat(70));

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Test Error:", error.message);
    process.exit(1);
  }
}

runFullTest();
