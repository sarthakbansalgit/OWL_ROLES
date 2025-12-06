import express from 'express';
import { 
  getJobsByCompany, 
  getApplicationsByJob, 
  getApplicationsByStatus, 
  getApplicationsOverTime 
} from '../controllers/chart.controller.js';
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Simple route that doesn't require authentication for testing
router.get('/jobsByCompany', cacheMiddleware(300), getJobsByCompany);
router.get('/applicationsByJob', cacheMiddleware(300), getApplicationsByJob);
router.get('/statusCounts', cacheMiddleware(300), getApplicationsByStatus);
router.get('/applicationsOverTime', cacheMiddleware(300), getApplicationsOverTime);

export default router;
