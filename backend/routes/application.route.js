import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import applicationController from "../controllers/application.controller.js"; // Adjusted import
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Route to apply for a job (POST method)
router.route("/apply/:id").post(applicationController.applyJob);

// Route to get applied jobs (GET method)
router.route("/get").get(applicationController.getAppliedJobs);

// Route to get applicants for a job (GET method)
router.route("/:id/applicants").get(applicationController.getApplicants);

// Route to get all applicants across all jobs
router.route("/applicants").get(applicationController.getAllApplicants);

// Route to update the status of an application (PATCH method)
router.route("/status/:id/update").patch(applicationController.updateStatus);

// Route for user to withdraw/delete their application (DELETE method)
router.route("/withdraw/:id").delete(applicationController.withdrawApplication);

// Route for recruiter to delete an application (DELETE method)
router.route("/delete/:id").delete(applicationController.deleteApplication);

// Route for recruiter to accept/reject an application (PATCH method)
router.route("/status/:id").patch(applicationController.updateApplicationStatus);

// Get total number of applicants for all jobs
router.get('/countApplicants', applicationController.getTotalApplicants);

// Get number of applicants of a company
router.get('/getApplicantCountsOfEachCompany', applicationController.getApplicantCountsOfEachCompany);


export default router;
