import Experience from '../models/Experience.js';

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const createExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json(exp);
  } catch (error) {
    console.error("Create Experience Error:", error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exp);
  } catch (error) {
    console.error("Update Experience Error:", error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
