import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  liveLink: String,
  githubLink: String,
  featured: Boolean,
  image: String, // Cloudinary URL
});

export default mongoose.model("Project", ProjectSchema);