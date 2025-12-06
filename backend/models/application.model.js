import mongoose from "mongoose";

class ApplicationModel {
  constructor() {
    const applicationSchema = new mongoose.Schema(
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
          required: true,
        },
        applicant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
      { timestamps: true }
    );

    this.Application = mongoose.model("Application", applicationSchema);
  }

  getModel() {
    return this.Application;
  }
}

export default new ApplicationModel().getModel();
