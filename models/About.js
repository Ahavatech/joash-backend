import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema({
  name: String,
  logo: {
    url: String,
    public_id: String,
  },
});

const AboutSchema = new mongoose.Schema({
  bio: String,
  technologies: [TechnologySchema],
});

export default mongoose.model("About", AboutSchema);
