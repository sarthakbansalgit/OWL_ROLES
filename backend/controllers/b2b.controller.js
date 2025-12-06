import Job from '../models/job.model.js';
import User from '../models/user.model.js';
import Application from '../models/application.model.js';
import Company from '../models/company.model.js';

class B2BAnalyticsController {
  // Job market analytics
  async getJobMarketAnalytics(req, res, next) {
    try {
      // Job distribution by type
      const jobTypeDistribution = await Job.aggregate([
        { $group: { _id: "$jobType", count: { $sum: 1 } } },
        { $project: { jobType: "$_id", count: 1, _id: 0 } }
      ]);

      // Job distribution by experience level
      const experienceLevelDistribution = await Job.aggregate([
        { $group: { _id: "$experienceLevel", count: { $sum: 1 } } },
        { $project: { experienceLevel: "$_id", count: 1, _id: 0 } }
      ]);

      // Job distribution by location
      const locationDistribution = await Job.aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $project: { location: "$_id", count: 1, _id: 0 } }
      ]);

      // Salary ranges
      const salaryRanges = await Job.aggregate([
        {
          $bucket: {
            groupBy: "$salary",
            boundaries: [0, 50000, 75000, 100000, 150000, 200000, 1000000],
            default: "1000000+",
            output: { count: { $sum: 1 } }
          }
        }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          jobTypeDistribution,
          experienceLevelDistribution,
          locationDistribution,
          salaryRanges
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Application analytics 
  async getApplicationAnalytics(req, res, next) {
    try {
      // Applications over time (aggregated by week)
      const applicationsOverTime = await Application.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $week: "$createdAt" }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.week": 1 } },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            week: "$_id.week",
            count: 1
          }
        }
      ]);

      // Application status distribution
      const statusDistribution = await Application.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { status: "$_id", count: 1, _id: 0 } }
      ]);

      // Average applications per job
      const averageApplicationsPerJob = await Job.aggregate([
        {
          $lookup: {
            from: "applications",
            localField: "_id",
            foreignField: "job",
            as: "applications"
          }
        },
        {
          $project: {
            _id: 0,
            jobId: "$_id",
            title: 1,
            applicationCount: { $size: "$applications" }
          }
        },
        {
          $group: {
            _id: null,
            averageApplications: { $avg: "$applicationCount" }
          }
        }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          applicationsOverTime,
          statusDistribution,
          averageApplicationsPerJob: averageApplicationsPerJob[0]?.averageApplications || 0
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Industry trends analytics
  async getIndustryTrends(req, res, next) {
    try {
      // Most in-demand skills (based on job requirements)
      const skillsDemand = await Job.aggregate([
        { $unwind: "$requirements" },
        { $group: { _id: "$requirements", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 15 },
        { $project: { skill: "$_id", count: 1, _id: 0 } }
      ]);

      // Most active hiring industries
      const hiringByIndustry = await Company.aggregate([
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "company",
            as: "jobs"
          }
        },
        {
          $group: {
            _id: "$industry",
            jobCount: { $sum: { $size: "$jobs" } }
          }
        },
        { $sort: { jobCount: -1 } },
        {
          $project: {
            industry: "$_id",
            jobCount: 1,
            _id: 0
          }
        }
      ]);

      // Average salary by position type
      const salaryByPosition = await Job.aggregate([
        {
          $group: {
            _id: "$position",
            averageSalary: { $avg: "$salary" },
            count: { $sum: 1 }
          }
        },
        { $match: { count: { $gt: 3 } } }, // Only include positions with enough data points
        { $sort: { averageSalary: -1 } },
        {
          $project: {
            position: "$_id",
            averageSalary: 1,
            jobCount: "$count",
            _id: 0
          }
        }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          skillsDemand,
          hiringByIndustry,
          salaryByPosition
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Time-based trend analytics
  async getTimeTrends(req, res, next) {
    try {
      const { period = 'month' } = req.query;
      
      let timeGrouping = {};
      if (period === 'day') {
        timeGrouping = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        };
      } else if (period === 'week') {
        timeGrouping = {
          year: { $year: "$createdAt" },
          week: { $week: "$createdAt" }
        };
      } else {
        timeGrouping = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        };
      }

      // Jobs posted over time
      const jobsOverTime = await Job.aggregate([
        {
          $group: {
            _id: timeGrouping,
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.week": 1 } },
        {
          $project: {
            timePeriod: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);

      // Applications over time
      const applicationsOverTime = await Application.aggregate([
        {
          $group: {
            _id: timeGrouping,
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.week": 1 } },
        {
          $project: {
            timePeriod: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);

      // Conversion rate over time (applications to jobs ratio)
      const timePeriodsWithData = [...new Set([
        ...jobsOverTime.map(j => JSON.stringify(j.timePeriod)),
        ...applicationsOverTime.map(a => JSON.stringify(a.timePeriod))
      ])].map(period => JSON.parse(period));

      const conversionRates = timePeriodsWithData.map(period => {
        const stringifiedPeriod = JSON.stringify(period);
        const jobsData = jobsOverTime.find(j => JSON.stringify(j.timePeriod) === stringifiedPeriod);
        const appsData = applicationsOverTime.find(a => JSON.stringify(a.timePeriod) === stringifiedPeriod);
        
        const jobCount = jobsData?.count || 0;
        const appCount = appsData?.count || 0;
        
        return {
          timePeriod: period,
          jobCount,
          applicationCount: appCount,
          applicationsPerJob: jobCount ? (appCount / jobCount).toFixed(2) : 0
        };
      });

      return res.status(200).json({
        success: true,
        data: {
          period,
          jobsOverTime,
          applicationsOverTime,
          conversionRates
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Removed the getBenchmarkingAnalytics method
}

export default new B2BAnalyticsController();