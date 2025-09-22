import Social from "../models/Social.js";

export const getSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.json({ success: true, socials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addSocial = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No icon uploaded" });
    const { platform, url } = req.body;
    const social = await Social.create({
      platform,
      url,
      icon: { url: req.file.path, public_id: req.file.filename || req.file.public_id },
    });
    res.json({ success: true, social });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSocial = async (req, res) => {
  try {
    const { platform, url } = req.body;
    const update = { platform, url };
    if (req.file) {
      update.icon = { url: req.file.path, public_id: req.file.filename || req.file.public_id };
    }
    const social = await Social.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!social) return res.status(404).json({ success: false, message: "Social not found" });
    res.json({ success: true, social });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSocial = async (req, res) => {
  try {
    await Social.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Social deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
