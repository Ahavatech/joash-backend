import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: {
    url: String,
    public_id: String,
  },
});

export default mongoose.model("Social", SocialSchema);
