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
    const { title, description, technologies, liveLink, githubLink, featured } = req.body;
    let imageUrl = "";
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // Cloudinary URL from multer
    }
    const project = new Project({
      title,
      description,
      technologies: technologies ? technologies.split(",") : [],
      liveLink,
      githubLink,
      featured: featured === "true",
      image: imageUrl,
    });
    await project.save();
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, liveLink, githubLink, featured } = req.body;
    let updateData = {
      title,
      description,
      technologies: technologies ? technologies.split(",") : [],
      liveLink,
      githubLink,
      featured: featured === "true",
    };
    if (req.file && req.file.path) {
      updateData.image = req.file.path;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};