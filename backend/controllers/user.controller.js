import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import PDFDocument from "pdfkit";
import applicationModel from "../models/application.model.js";
import moment from 'moment';
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

// Simple email validation regex
//format: something@something.something
const simpleEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Simple password validation regex

// This regex enforces the following rules:
// - Minimum 8 characters
// - At least one lowercase letter
// - At least one uppercase letter
// - At least one digit
// - At least one special character (like @, #, $, etc.)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

class UserController {
    // Register a new user
    async register(req, res, next) {
        try {
            const { 
                fullname, email, phoneNumber, password, role, 
                bio, location, orcidId, researchAreas, qualifications,
                experience, publications, coursesTaught, demoVideo
            } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password || !role) {
                return res.status(400).json({ message: "Something is missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Build profile object with provided fields
            const profileData = {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
            };
            
            // Add profile fields
            if (bio?.trim()) profileData.bio = bio.trim();
            if (location?.trim()) profileData.location = location.trim();
            if (orcidId?.trim()) profileData.orcidId = orcidId.trim();
            
            // Parse and add qualifications
            if (qualifications) {
                try {
                    const qualsArray = typeof qualifications === 'string' ? JSON.parse(qualifications) : qualifications;
                    if (Array.isArray(qualsArray) && qualsArray.length > 0) {
                        profileData.qualifications = qualsArray.filter(q => q.title?.trim());
                    }
                } catch (parseError) {
                    console.warn("Could not parse qualifications:", parseError);
                }
            }
            
            // Parse and add research areas
            if (researchAreas) {
                try {
                    const areasArray = typeof researchAreas === 'string' ? JSON.parse(researchAreas) : researchAreas;
                    if (Array.isArray(areasArray) && areasArray.length > 0) {
                        profileData.researchAreas = areasArray.filter(a => a.field?.trim());
                    }
                } catch (parseError) {
                    console.warn("Could not parse researchAreas:", parseError);
                }
            }

            // Parse and add experience
            if (experience) {
                try {
                    const expArray = typeof experience === 'string' ? JSON.parse(experience) : experience;
                    if (Array.isArray(expArray) && expArray.length > 0) {
                        profileData.experience = expArray.filter(e => e.title?.trim());
                    }
                } catch (parseError) {
                    console.warn("Could not parse experience:", parseError);
                }
            }

            // Parse and add publications
            if (publications) {
                try {
                    const pubArray = typeof publications === 'string' ? JSON.parse(publications) : publications;
                    if (Array.isArray(pubArray) && pubArray.length > 0) {
                        profileData.publications = pubArray.filter(p => p.title?.trim());
                    }
                } catch (parseError) {
                    console.warn("Could not parse publications:", parseError);
                }
            }

            // Parse and add courses taught
            if (coursesTaught) {
                try {
                    const coursesArray = typeof coursesTaught === 'string' ? JSON.parse(coursesTaught) : coursesTaught;
                    if (Array.isArray(coursesArray) && coursesArray.length > 0) {
                        profileData.coursesTaught = coursesArray.filter(c => c.name?.trim());
                    }
                } catch (parseError) {
                    console.warn("Could not parse coursesTaught:", parseError);
                }
            }
            
            await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: profileData,
            });

            return res.status(201).json({ message: "Account created successfully.", success: true });
        } catch (error) {
            next(error); // Propagate errors to the error handler
        }
    }

    // Login a user
    async login(req, res, next) {
        try {
            const { email, password, role } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format.", success: false });
            }

            // Check for missing fields
            if (!email || !password || !role) {
                return res.status(400).json({ message: "Something is missing", success: false });
            }

            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ message: "Incorrect email or password.", success: false });
            }

            // Check if role is correct
            if (role !== user.role) {
                return res.status(400).json({ message: "Account doesn't exist with the current role.", success: false });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res
                .status(200)
                .cookie("token", token, { 
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',                
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    maxAge: 7 * 24 * 60 * 60 * 1000 
                })
                .json({
                    message: `Welcome back ${user.fullname}`,
                    user: this.getUserResponse(user),
                    success: true,
                });
        } catch (error) {
            next(error);
        }
    }

    // Logout user
    async logout(req, res, next) {
        try {
            return res.status(200).cookie("token", "", { maxAge: 0 }).json({
                message: "Logged out successfully.",
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update user profile
    async updateProfile(req, res, next) {
        try {
            const userId = req.id;
            const files = req.files || {};
            
            console.log("\n====== UPDATE PROFILE DEBUG ======");
            console.log("User ID:", userId);
            console.log("Request body keys:", Object.keys(req.body));
            console.log("Full request body:", req.body);
            console.log("Files received:", Object.keys(files));

            if (!userId) {
                console.error("No user ID in request");
                return res.status(400).json({ message: "User not authenticated.", success: false });
            }

            const user = await User.findById(userId).lean().exec();
            if (!user) {
                console.error("User not found in DB");
                return res.status(400).json({ message: "User not found.", success: false });
            }

            console.log("Current user fullname:", user.fullname);

            // Use findByIdAndUpdate for more reliable updates
            const updateData = {};

            // Add top-level fields
            if (req.body.fullname?.trim()) updateData.fullname = req.body.fullname.trim();
            if (req.body.email?.trim()) updateData.email = req.body.email.trim();
            if (req.body.phoneNumber?.trim()) updateData.phoneNumber = req.body.phoneNumber.trim();

            // Add profile fields
            const profileUpdates = {};
            if (req.body.bio?.trim()) profileUpdates.bio = req.body.bio.trim();
            if (req.body.location?.trim()) profileUpdates.location = req.body.location.trim();
            if (req.body.orcidId?.trim()) profileUpdates.orcidId = req.body.orcidId.trim();
            
            if (req.body.skills) {
                profileUpdates.skills = typeof req.body.skills === 'string' 
                    ? req.body.skills.split(",").map(s => s.trim()) 
                    : req.body.skills;
            }
            
            if (req.body.qualifications?.length > 0) {
                profileUpdates.qualifications = typeof req.body.qualifications === 'string' 
                    ? JSON.parse(req.body.qualifications) 
                    : req.body.qualifications;
            }
            
            if (req.body.researchAreas?.length > 0) {
                profileUpdates.researchAreas = typeof req.body.researchAreas === 'string' 
                    ? JSON.parse(req.body.researchAreas) 
                    : req.body.researchAreas;
            }
            
            if (req.body.experience?.length > 0) {
                profileUpdates.experience = typeof req.body.experience === 'string' 
                    ? JSON.parse(req.body.experience) 
                    : req.body.experience;
            }
            
            if (req.body.coursesTaught?.length > 0) {
                profileUpdates.coursesTaught = typeof req.body.coursesTaught === 'string' 
                    ? JSON.parse(req.body.coursesTaught) 
                    : req.body.coursesTaught;
            }
            
            if (req.body.publications?.length > 0) {
                profileUpdates.publications = typeof req.body.publications === 'string' 
                    ? JSON.parse(req.body.publications) 
                    : req.body.publications;
            }

            // Handle file uploads - files come as array from multer.any()
            if (Array.isArray(files) && files.length > 0) {
                // Find resume file
                const resumeFile = files.find(f => f.fieldname === 'resume');
                if (resumeFile) {
                    try {
                        console.log("Resume file details:", {
                            originalname: resumeFile.originalname,
                            mimetype: resumeFile.mimetype,
                            size: resumeFile.size
                        });
                        
                        const fileUri = getDataUri(resumeFile);
                        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                            resource_type: 'raw',
                            public_id: `resume_${userId}_${Date.now()}`,
                        });
                        
                        console.log("Cloudinary response for resume:", cloudResponse);
                        
                        // Use secure_url directly from Cloudinary response
                        profileUpdates.resume = cloudResponse.secure_url;
                        profileUpdates.resumeOriginalName = resumeFile.originalname;
                        console.log("Resume uploaded successfully:", {
                            url: cloudResponse.secure_url,
                            originalName: resumeFile.originalname
                        });
                    } catch (fileError) {
                        console.error("Resume upload error:", fileError.message);
                        return res.status(400).json({ message: "Resume upload failed.", success: false });
                    }
                }

                // Find profile photo file
                const photoFile = files.find(f => f.fieldname === 'profilePhoto');
                if (photoFile) {
                    try {
                        console.log("Profile photo details:", {
                            originalname: photoFile.originalname,
                            mimetype: photoFile.mimetype,
                            size: photoFile.size
                        });
                        
                        const fileUri = getDataUri(photoFile);
                        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                            public_id: `profile_${userId}_${Date.now()}`,
                        });
                        
                        console.log("Cloudinary response for photo:", cloudResponse);
                        
                        profileUpdates.profilePhoto = cloudResponse.secure_url;
                        console.log("Profile photo uploaded successfully:", cloudResponse.secure_url);
                    } catch (fileError) {
                        console.error("Profile photo upload error:", fileError.message);
                        return res.status(400).json({ message: "Profile photo upload failed.", success: false });
                    }
                }
            }

            // Merge profile updates into main update data
            if (Object.keys(profileUpdates).length > 0) {
                updateData.profile = profileUpdates;
            }

            console.log("Update data to apply:", JSON.stringify(updateData, null, 2));

            if (Object.keys(updateData).length === 0) {
                console.warn("No updates to apply");
                return res.status(400).json({ message: "No changes to update.", success: false });
            }

            // Update and return the new document
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: false }
            );

            if (!updatedUser) {
                console.error("Failed to update user");
                return res.status(400).json({ message: "Failed to update user.", success: false });
            }

            console.log("User updated successfully");
            console.log("Updated user profile:", JSON.stringify(updatedUser.profile, null, 2));
            console.log("====== UPDATE COMPLETE ======\n");

            return res.status(200).json({
                message: "Profile updated successfully.",
                user: this.getUserResponse(updatedUser),
                success: true,
            });
        } catch (error) {
            console.error("\n====== UPDATE ERROR ======");
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
            console.error("==========================\n");
            
            return res.status(500).json({
                message: error.message || "Failed to update profile",
                success: false
            });
        }
    }

    // Helper function to format user response
    getUserResponse(user) {
        return {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
    }

    async generateUserReport(req, res, next) {
        try {
            const userId = req.id;
    
            if (!mongoose.isValidObjectId(userId)) {
                return res.status(400).json({ 
                    message: "Invalid user ID format",
                    success: false 
                });
            }
    
            const userObjectId = new mongoose.Types.ObjectId(userId);
            
            const user = await User.findById(userObjectId); 
            
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }
    
            const applications = await applicationModel
                .find({ applicant: userObjectId }) 
                .populate({
                    path: 'job',
                    populate: { 
                        path: 'company',
                        model: 'Company'
                    }
                })
                .lean();
    
            // 3. Add debug logging
            console.log(`Found ${applications.length} applications for user ${userId}`);
            console.log('Sample application:', applications[0]);
    
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${user.fullname}_report.pdf`);
    
            // PDF Content
            doc.fontSize(18).text(`Career Report for ${user.fullname}`, { align: 'center' });
            doc.moveDown();
            
            // User Details Table
            doc.fontSize(12)
               .text(`Email: ${user.email || 'Not provided'}`, { continued: true })
               .text(`Phone: ${user.phoneNumber || 'Not provided'}`, { align: 'right' });
            
            doc.moveDown(2);
    
            // Applications Section
            doc.fontSize(16).text('Job Applications', { underline: true });
            
            if (applications.length === 0) {
                doc.fontSize(12).text('No applications found.', { color: '#666' });
            } else {
                applications.forEach((app, index) => {
                    // Application Header
                    doc.moveDown()
                       .fontSize(14)
                       .fillColor('#333')
                       .text(`${index + 1}. ${app.job?.title || 'Untitled Position'}`, {
                           underline: true
                       });
    
                    // Application Details
                    doc.fontSize(12)
                       .fillColor('#666')
                       .text(`Company: ${app.job?.company?.name || 'Company not specified'}`);
                    
                    // Status with color coding
                    const statusColor = app.status === 'accepted' ? '#22c55e' : 
                                      app.status === 'rejected' ? '#ef4444' : '#eab308';
                    doc.text(`Status: `)
                       .fillColor(statusColor)
                       .text(app.status.toUpperCase())
                       .fillColor('#666');
    
                    doc.text(`Applied: ${moment(app.createdAt).format('MMM D, YYYY')}`);
                    
                    // Separator
                    if (index < applications.length - 1) {
                        doc.moveDown(0.5)
                           .lineWidth(0.5)
                           .strokeColor('#ddd')
                           .lineCap('butt')
                           .moveTo(doc.x, doc.y)
                           .lineTo(doc.page.width - 50, doc.y)
                           .stroke();
                    }
                });
            }
    
            doc.end();
            doc.pipe(res);
    
        } catch (error) {
            console.error('Report generation error:', error);
            res.status(500).json({ 
                message: 'Failed to generate report',
                error: error.message,
                success: false 
            });
        }
    }

    async getAllRecruiters(req, res, next) {
        try {
            const recruiters = await userModel.find({ role: 'recruiter' }) 
                .select('fullname email phoneNumber') 

    
            if (recruiters.length === 0) {
                return res.status(404).json({ message: "No recruiters found.", success: false });
            }
    
            return res.status(200).json({ recruiters, success: true });
        } catch (error) {
            next(error);
        }
    }

    // Get total number of Recruiters
    async getRecruiterCount(req, res, next) {
        try {
            const totalRecruiters = await userModel.countDocuments({ role: 'recruiter' }); // Count users with role 'recruiter'
    
            return res.status(200).json({ count: totalRecruiters, success: true });
        } catch (error) {
            next(error);
        }
    }

    // Delete a recruiter by ID
    async deleteRecruiter(req, res, next) {
        try {
            const { id } = req.params;
            
            // Find and delete the recruiter
            const deletedRecruiter = await User.findByIdAndDelete(id);
            
            if (!deletedRecruiter) {
                return res.status(404).json({ message: 'Recruiter not found' });
            }
            
            res.status(200).json({ 
                success: true, 
                message: 'Recruiter deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting recruiter:', error);
            next(error);
        }
    }

    // Get all users with role 'student'
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find({ role: 'student' })
                .select('fullname email phoneNumber createdAt');

            if (users.length === 0) {
                return res.status(404).json({ message: "No users found.", success: false });
            }

            return res.status(200).json({ users, success: true });
        } catch (error) {
            next(error);
        }
    }

    // Delete a user by ID
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            
            // Find and delete the user
            const deletedUser = await User.findByIdAndDelete(id);
            
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found', success: false });
            }
            
            return res.status(200).json({ 
                success: true, 
                message: 'User deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            next(error);
        }
    }

    // Admin function to add a new applicant/student
    async addApplicantByAdmin(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, role = 'student' } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password) {
                return res.status(400).json({ message: "Required fields are missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
                },
            });

            return res.status(201).json({ 
                message: "Applicant created successfully.", 
                user: this.getUserResponse(newUser),
                success: true 
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin function to add a new recruiter
    async addRecruiterByAdmin(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, bio } = req.body;
            const role = 'recruiter'; // Force role to be recruiter

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password) {
                return res.status(400).json({ message: "Required fields are missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newRecruiter = await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
                    bio: bio || "",
                },
            });

            return res.status(201).json({ 
                message: "Recruiter created successfully.", 
                user: this.getUserResponse(newRecruiter),
                success: true 
            });
        } catch (error) {
            next(error);
        }
    }

    register = this.register.bind(this);
    login = this.login.bind(this);
    logout = this.logout.bind(this);
    updateProfile = this.updateProfile.bind(this);
    generateUserReport = this.generateUserReport.bind(this);
    getAllRecruiters = this.getAllRecruiters.bind(this);
    getRecruiterCount = this.getRecruiterCount.bind(this);
    deleteRecruiter = this.deleteRecruiter.bind(this);
    getAllUsers = this.getAllUsers.bind(this);
    deleteUser = this.deleteUser.bind(this);
    addApplicantByAdmin = this.addApplicantByAdmin.bind(this);
    addRecruiterByAdmin = this.addRecruiterByAdmin.bind(this);
}

const userController = new UserController();
export const { 
    register, 
    login, 
    logout, 
    updateProfile, 
    generateUserReport, 
    getAllRecruiters, 
    getRecruiterCount,
    deleteRecruiter,
    getAllUsers,
    deleteUser,
    addApplicantByAdmin,
    addRecruiterByAdmin
} = userController;
