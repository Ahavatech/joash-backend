import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
});

export default mongoose.model("Hero", HeroSchema);
