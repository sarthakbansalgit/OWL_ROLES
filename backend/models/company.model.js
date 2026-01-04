import mongoose from "mongoose";

class CompanyModel {
  constructor() {
    const companySchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
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
        deleted: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    );

    // Unique index on name and userId combination (each recruiter can have one unique name)
    companySchema.index({ name: 1, userId: 1 }, { unique: true, sparse: true });

    this.Company = mongoose.model("Company", companySchema);
  }

  getModel() {
    return this.Company;
  }
}

export default new CompanyModel().getModel();
