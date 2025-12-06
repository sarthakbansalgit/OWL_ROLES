import Job from '../models/job.model.js';
import Application from '../models/application.model.js';

// Define catchAsyncErrors directly in this file
const catchAsyncErrors = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

// Get job count by company
export const getJobsByCompany = catchAsyncErrors(async (req, res) => {
  try {
    // Simple aggregation to count jobs by company
    const jobsByCompany = await Job.aggregate([
      {
        $lookup: {
          from: 'companies',
          localField: 'company',
          foreignField: '_id',
          as: 'companyData'
        }
      },
      { $unwind: '$companyData' },
      {
        $group: {
          _id: '$company',
          companyName: { $first: '$companyData.name' },
          count: { $sum: 1 }
        }
      },
      { $project: { _id: 0, companyName: 1, count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 5 } // Reduced to 5 for testing
    ]);

    return res.status(200).json({
      success: true,
      jobCounts: jobsByCompany
    });
  } catch (error) {
    console.error('Error in getJobsByCompany:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching job counts by company',
      error: error.message
    });
  }
});

// Get application count by job title
export const getApplicationsByJob = catchAsyncErrors(async (req, res) => {
  try {
    // Aggregation to count applications by job title
    const applicationsByJob = await Application.aggregate([
      {
        $lookup: {
          from: 'jobs',
          localField: 'job',
          foreignField: '_id',
          as: 'jobData'
        }
      },
      { $unwind: '$jobData' },
      {
        $group: {
          _id: '$job',
          jobTitle: { $first: '$jobData.title' },
          count: { $sum: 1 }
        }
      },
      { $project: { _id: 0, jobTitle: 1, count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return res.status(200).json({
      success: true,
      applicationCounts: applicationsByJob
    });
  } catch (error) {
    console.error('Error in getApplicationsByJob:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching application counts by job',
      error: error.message
    });
  }
});

// Get application count by status
export const getApplicationsByStatus = catchAsyncErrors(async (req, res) => {
  try {
    // Aggregation to count applications by status
    const statusCounts = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          status: { $first: '$status' },
          count: { $sum: 1 }
        }
      },
      { $project: { _id: 0, status: 1, count: 1 } },
      { $sort: { count: -1 } }
    ]);

    return res.status(200).json({
      success: true,
      statusCounts: statusCounts
    });
  } catch (error) {
    console.error('Error in getApplicationsByStatus:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching application counts by status',
      error: error.message
    });
  }
});

// Get applications over time (monthly)
export const getApplicationsOverTime = catchAsyncErrors(async (req, res) => {
  try {
    // Aggregation to count applications by month and year
    const applicationsOverTime = await Application.aggregate([
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: { 
            $dateToString: { 
              format: "%Y-%m-%d", 
              date: { 
                $dateFromParts: { 
                  year: "$_id.year", 
                  month: "$_id.month", 
                  day: 1 
                } 
              } 
            } 
          },
          count: 1
        }
      },
      { $sort: { date: 1 } }
    ]);

    return res.status(200).json({
      success: true,
      timeData: applicationsOverTime
    });
  } catch (error) {
    console.error('Error in getApplicationsOverTime:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching applications over time',
      error: error.message
    });
  }
});
