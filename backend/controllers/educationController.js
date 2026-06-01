import Education from '../models/Education.js';

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const createEducation = async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  } catch (error) {
    console.error("Create Education Error:", error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(edu);
  } catch (error) {
    console.error("Update Education Error:", error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
