import Job from "../models/job.model.js";
import Company from "../models/company.model.js";

class JobController {
  // Admin posts a job
  async postJob(req, res, next) {
    try {
      const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
      const userId = req.id || null; // Allow null if not authenticated

      if (!title || !description || !salary || !location || !jobType || !position || !companyId) {
        return res.status(400).json({ message: "Something is missing.", success: false });
      }

      // Check if company exists and is not deleted
      const company = await Company.findById(companyId);
      if (!company || company.deleted) {
        return res.status(404).json({ message: "Company not found or has been deleted.", success: false });
      }

      const job = await Job.create({
        title,
        description,
        requirements: requirements ? requirements.split(",") : [],
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: experience || 1,
        position,
        company: companyId,
        created_by: userId,
      });

      return res.status(201).json({ message: "New job created successfully.", job, success: true });
    } catch (error) {
      next(error); // Use next for error propagation
    }
  }

  // Get all jobs for students
  async getAllJobs(req, res, next) {
    try {
      const keyword = req.query.keyword || "";
      const query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };

      const jobs = await Job.find(query).populate({ 
        path: "company",
        match: { deleted: { $in: [false, null, undefined] } }
      }).sort({ createdAt: -1 });

      // Filter out jobs where company was deleted
      const filteredJobs = jobs.filter(job => job.company !== null);

      if (filteredJobs.length === 0) {
        return res.status(200).json({ jobs: [], success: true });
      }

      return res.status(200).json({ jobs: filteredJobs, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Get a job by ID for students
  async getJobById(req, res, next) {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({ path: "applications" }).populate({ path: "company" });

      if (!job || !job.company || job.company.deleted) {
        return res.status(404).json({ message: "Job not found.", success: false });
      }

      return res.status(200).json({ job, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Get all jobs for students
  async getJobCount(req, res, next) {
    try {
      const count = await Job.countDocuments(); // Count all job documents
      return res.status(200).json({ count, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Get jobs created by logged-in HR
  async getAdminJobs(req, res, next) {
    try {
      const userId = req.id; // Get authenticated user's ID from middleware

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please login.", success: false });
      }

      // Get only jobs created by this HR user with non-deleted companies
      const jobs = await Job.find({ created_by: userId })
        .sort({ createdAt: -1 })
        .populate({ 
          path: 'company',
          match: { deleted: { $in: [false, null, undefined] } }
        });

      // Filter out jobs where company was deleted
      const filteredJobs = jobs.filter(job => job.company !== null);

      if (filteredJobs.length === 0) {
        return res.status(200).json({ message: "No jobs created by you yet.", jobs: [], success: true });
      }

      return res.status(200).json({ jobs: filteredJobs, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Update a job using job id (only by creator)
  async updateJob(req, res, next) {
    try {
      const jobID = req.params.id;
      const userId = req.id; // Get authenticated user's ID

      if (!jobID) {
        return res.status(404).json({ message: "Job not found!", success: false });
      }

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please login.", success: false });
      }

      // Check if job exists and belongs to current user
      const job = await Job.findById(jobID);
      if (!job) {
        return res.status(404).json({ message: "Job not found!", success: false });
      }

      if (job.created_by.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized. You can only edit jobs you created.", success: false });
      }

      const updatedJob = await Job.findByIdAndUpdate(jobID, { $set: req.body }, { new: true });

      res.status(200).json({ message: "Job updated successfully!", success: true, job: updatedJob });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // Delete a job by ID (only by creator)
  async deleteJob(req, res, next) {
    try {
      const jobId = req.params.id;
      const userId = req.id; // Get authenticated user's ID

      if (!jobId) {
        return res.status(400).json({ message: "Job ID is required.", success: false });
      }

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please login.", success: false });
      }

      // Check if job exists and belongs to current user
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found.", success: false });
      }

      if (job.created_by.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized. You can only delete jobs you created.", success: false });
      }

      await Job.findByIdAndDelete(jobId);

      return res.status(200).json({ message: "Job deleted successfully.", success: true });
    } catch (error) {
      next(error);
    }
  }

  
}

export default new JobController();
