import Technology from "../models/Technology.js";

export const getTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json({ success: true, technologies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addTechnology = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    let iconPath = icon || '';
    if (req.file && req.file.path) {
      iconPath = req.file.path;
    }
    if (!name) return res.status(400).json({ success: false, message: "Technology name is required" });
    const technology = await Technology.create({
      name,
      description,
      icon: iconPath,
    });
    res.json({ success: true, technology });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTechnology = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const update = { name, description };
    if (req.file && req.file.path) {
      update.icon = req.file.path;
    } else if (icon) {
      update.icon = icon;
    }
    const technology = await Technology.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!technology) return res.status(404).json({ success: false, message: "Technology not found" });
    res.json({ success: true, technology });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTechnology = async (req, res) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Technology deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTechnology = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    if (!technology) return res.status(404).json({ success: false, message: "Technology not found" });
    res.json({ success: true, technology });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};