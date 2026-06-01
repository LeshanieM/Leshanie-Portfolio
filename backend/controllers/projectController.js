import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const createProject = async (req, res) => {
  try {
    const proj = await Project.create(req.body);
    res.status(201).json(proj);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const proj = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(proj);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
