import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  description: String,
  profileImage: String,
});

export default mongoose.model("About", AboutSchema);
