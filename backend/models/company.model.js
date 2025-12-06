import mongoose from "mongoose";

class CompanyModel {
  constructor() {
    const companySchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        description: {
          type: String,
        },
        website: {
          type: String,
        },
        location: {
          type: String,
        },
        logo: {
          type: String, // URL to company logo
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
      },
      { timestamps: true }
    );

    this.Company = mongoose.model("Company", companySchema);
  }

  getModel() {
    return this.Company;
  }
}

export default new CompanyModel().getModel();
