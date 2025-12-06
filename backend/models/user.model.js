import mongoose from "mongoose";

class UserModel {
  constructor() {
    const userSchema = new mongoose.Schema(
      {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: Number, required: true },
        password: { type: String, required: true },
        role: {
          type: String,
          enum: ["student", "recruiter", "superUser"],
          required: true,
        },
        profile: {
          bio: { type: String },
          skills: [{ type: String }],
          resume: { type: String },
          resumeOriginalName: { type: String },
          company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
          profilePhoto: { type: String, default: "" },
        },
      },
      { timestamps: true }
    );

    this.User = mongoose.model("User", userSchema);
  }

  getModel() {
    return this.User;
  }
}

export default new UserModel().getModel();
