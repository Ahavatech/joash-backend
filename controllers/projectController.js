import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addProject = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
    const { title, description, technologies, liveLink, githubLink } = req.body;
    const project = await Project.create({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [technologies],
      image: { url: req.file.path, public_id: req.file.filename || req.file.public_id },
      liveLink,
      githubLink,
    });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, liveLink, githubLink } = req.body;
    const update = { title, description, technologies, liveLink, githubLink };
    if (req.file) {
      update.image = { url: req.file.path, public_id: req.file.filename || req.file.public_id };
    }
    const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
