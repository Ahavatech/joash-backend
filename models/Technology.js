import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Technology name is required"],
      trim: true,
    },
    icon: {
      type: String, // Could be a Cloudinary URL or local path
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Technology = mongoose.model("Technology", technologySchema);

export default Technology;
