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
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
    const { name, description } = req.body;
    const technology = await Technology.create({
      name,
      description,
      icon: req.file.path,
    });
    res.json({ success: true, technology });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTechnology = async (req, res) => {
  try {
    const { name, description } = req.body;
    const update = { name, description };
    if (req.file) {
      update.icon = req.file.path;
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