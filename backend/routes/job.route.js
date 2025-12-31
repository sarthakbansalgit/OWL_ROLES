import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import jobController from "../controllers/job.controller.js"; 
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

router.route("/post").post(isAuthenticated, jobController.postJob);
router.route("/get").get(jobController.getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, jobController.getAdminJobs); 
router.route("/get/:id").get(cacheMiddleware(300), jobController.getJobById); 
router.route("/count").get(cacheMiddleware(300), jobController.getJobCount); 
router.route("/update/:id").put(isAuthenticated, jobController.updateJob);
router.route("/delete/:id").delete(isAuthenticated, jobController.deleteJob);

export default router;
