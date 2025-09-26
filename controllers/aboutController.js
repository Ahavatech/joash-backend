import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAbout = async (req, res) => {
  const { description, profileImage } = req.body;
  try {
    const about = await About.findOneAndUpdate(
      {},
      { description, profileImage },
      { new: true, upsert: true }
    );
    res.json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};