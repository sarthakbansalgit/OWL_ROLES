import express from "express";
import b2bAnalyticsController from "../controllers/b2b.controller.js";
import apiKeyAuth from "../middlewares/b2b.apikeyauth.js";

const router = express.Router();

// B2B Analytics API routes - all protected with API key authentication
router.get("/job-market", apiKeyAuth, b2bAnalyticsController.getJobMarketAnalytics);
router.get("/applications", apiKeyAuth, b2bAnalyticsController.getApplicationAnalytics);
router.get("/industry-trends", apiKeyAuth, b2bAnalyticsController.getIndustryTrends);
router.get("/time-trends", apiKeyAuth, b2bAnalyticsController.getTimeTrends);
// Removed benchmarking endpoint

export default router;