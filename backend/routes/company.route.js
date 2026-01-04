import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import companyController from "../controllers/company.controller.js"; 
import { singleUpload } from "../middlewares/mutler.js";
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Route to register a company (POST method)
router.route("/register").post(isAuthenticated, companyController.registerCompany);

// Route to get all companies for the authenticated user (GET method - no caching for fresh data)
router.route("/get").get(isAuthenticated, companyController.getCompany);

// Route to get a specific company by ID (GET method)
router.route("/get/:id").get(isAuthenticated, companyController.getCompanyById);

// Route to update a company by ID (PUT method with file upload)
router.route("/update/:id").put(isAuthenticated, singleUpload, companyController.updateCompany);

// Route to add a new company with logo upload
router.route("/add").post(isAuthenticated, singleUpload, companyController.addCompany);

// Add this route to get all companies (for admin/superuser only)
router.get('/companies/all', isAuthenticated, cacheMiddleware(300), companyController.getAllCompanies);

//Route to get all the recruiters
router.get('/companyCount', isAuthenticated, companyController.companyCount);

// Route to delete a company
router.delete('/delete/:id', isAuthenticated, companyController.deleteCompany);
