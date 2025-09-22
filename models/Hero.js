import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  headline: String,
  subheadline: String,
  ctaText: String,
  ctaLink: String,
  backgroundImage: {
    url: String,
    public_id: String,
  },
});

export default mongoose.model("Hero", HeroSchema);
