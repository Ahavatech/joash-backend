import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  image: {
    url: String,
    public_id: String,
  },
  liveLink: String,
  githubLink: String,
});

export default mongoose.model("Project", ProjectSchema);
