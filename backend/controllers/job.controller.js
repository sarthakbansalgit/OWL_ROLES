import Job from "../models/job.model.js";

class JobController {
  // Admin posts a job
  async postJob(req, res, next) {
    try {
      const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
      const userId = req.id || null; // Allow null if not authenticated

      if (!title || !description || !salary || !location || !jobType || !position || !companyId) {
        return res.status(400).json({ message: "Something is missing.", success: false });
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

      const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

      if (jobs.length === 0) {
        return res.status(404).json({ message: "Jobs not found.", success: false });
      }

      return res.status(200).json({ jobs, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Get a job by ID for students
  async getJobById(req, res, next) {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({ path: "applications" });

      if (!job) {
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

  // Get jobs created by admin
  async getAdminJobs(req, res, next) {
    try {
      // Get all jobs since authentication is removed
      const jobs = await Job.find()
      .sort({ createdAt: -1 }) 
      .populate({ path: 'company' });


      if (jobs.length === 0) {
        return res.status(404).json({ message: "Jobs not found.", success: false });
      }

      return res.status(200).json({ jobs, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Update a job using job id
  async updateJob(req, res, next) {
    try {
      const jobID = req.params.id;
      console.log("triggred")
      if (!jobID) {
        return res.status(404).json({ message: "Job not found!", success: false });
      }
  
      const updatedJob = await Job.findByIdAndUpdate(jobID, { $set: req.body }, { new: true });
  
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found!", success: false });
      }
  
      res.status(200).json({ message: "Job updated successfully!", success: true, job: updatedJob });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // Delete a job by ID
  async deleteJob(req, res, next) {
    try {
      const jobId = req.params.id;

      if (!jobId) {
        return res.status(400).json({ message: "Job ID is required.", success: false });
      }

      const deletedJob = await Job.findByIdAndDelete(jobId);

      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found.", success: false });
      }

      return res.status(200).json({ message: "Job deleted successfully.", success: true });
    } catch (error) {
      next(error);
    }
  }

  
}

export default new JobController();
