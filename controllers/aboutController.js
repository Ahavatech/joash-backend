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
  const { bio } = req.body;
  try {
    const about = await About.findOneAndUpdate({}, { bio }, { new: true, upsert: true });
    res.json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addTechnology = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No logo uploaded" });
    const { name } = req.body;
    const tech = { name, logo: { url: req.file.path, public_id: req.file.filename || req.file.public_id } };
    const about = await About.findOneAndUpdate({}, { $push: { technologies: tech } }, { new: true, upsert: true });
    res.json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTechnology = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, { $pull: { technologies: { _id: req.params.id } } }, { new: true });
    res.json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
