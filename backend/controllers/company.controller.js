import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import companyModel from "../models/company.model.js";

class CompanyController {
  // Register a new company
  async registerCompany(req, res, next) {
    try {
      const { companyName } = req.body;
      if (!companyName) {
        return res.status(400).json({ message: "Company name is required.", success: false });
      }

      const existingCompany = await Company.findOne({ name: companyName });
      if (existingCompany) {
        return res.status(400).json({ message: "You can't register the same company.", success: false });
      }

      // Use userId if authenticated, otherwise null
      const newCompany = await Company.create({ name: companyName, userId: req.id || null });
      return res.status(201).json({ message: "Company registered successfully.", company: newCompany, success: true });
    } catch (error) {
      next(error); // Use next for error propagation
    }
  }

  // Get all companies for a user
  async getCompany(req, res, next) {
    try {
      const userId = req.id; // Logged in user id
      const fetchedCompanies = await Company.find({ userId });
  
      if (fetchedCompanies.length === 0) {
        return res.status(404).json({ message: "Companies not found.", success: false });
      }
  
      const sortedCompanies = fetchedCompanies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      return res.status(200).json({ companies: sortedCompanies, success: true });
    } catch (error) {
      next(error);
    }
  }
  

  // Get all companies across users
  async getAllCompanies(req, res, next) {
    try {
      const companies = await Company.find()
        .select('name website location logo createdAt') 
        .populate({
          path: 'userId',
          select: 'fullname email', 
        });

      if (companies.length === 0) {
        return res.status(404).json({ message: "No companies found.", success: false });
      }

      return res.status(200).json({ companies, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Get total number of Companies
  async companyCount(req, res, next) {
    try {
        const totalCompanies = await companyModel.countDocuments(); 

        return res.status(200).json({ count: totalCompanies, success: true });
    } catch (error) {
        next(error); 
    }
  }


  // Get a specific company by ID
  async getCompanyById(req, res, next) {
    try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: "Company not found.", success: false });
      }

      return res.status(200).json({ company, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Update company information
  async updateCompany(req, res, next) {
    try {
      const { name, description, website, location } = req.body;
      const file = req.file;

      // If there's a logo file, upload to Cloudinary
      let logo;
      if (file) {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        logo = cloudResponse.secure_url;
      }

      const updateData = { name, description, website, location, ...(logo && { logo }) };
      const updatedCompany = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!updatedCompany) {
        return res.status(404).json({ message: "Company not found.", success: false });
      }

      return res.status(200).json({ message: "Company information updated.", success: true });
    } catch (error) {
      next(error);
    }
  }

  // To delete a company by company ID
  async deleteCompany(req, res, next) {
    try {
      const companyId = req.params.id;
  
      const deletedCompany = await Company.findByIdAndDelete(companyId);
  
      if (!deletedCompany) {
        return res.status(404).json({ message: "Company not found.", success: false });
      }
  
      return res.status(200).json({ message: "Company deleted successfully.", success: true });
    } catch (error) {
      next(error);
    }
  } 

  // Add a new company with logo upload
  async addCompany(req, res, next) {
    try {
      const { name, description, website, location } = req.body;
      
      if (!name) {
        return res.status(400).json({ 
          message: "Company name is required.", 
          success: false 
        });
      }

      // Check if company with same name already exists
      const existingCompany = await Company.findOne({ name });
      if (existingCompany) {
        return res.status(400).json({ 
          message: "A company with this name already exists.", 
          success: false 
        });
      }

      // Upload logo if it exists
      let logo;
      if (req.file) {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        logo = cloudResponse.secure_url;
      }

      // Create new company
      const newCompany = await Company.create({
        name,
        description,
        website,
        location,
        logo,
        userId: req.id,
      });

      return res.status(201).json({
        message: "Company created successfully.",
        company: newCompany,
        success: true
      });
    } catch (error) {
      next(error);
    }
  }

}

export default new CompanyController();
