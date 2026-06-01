import Profile from '../models/Profile.js';
import Education from '../models/Education.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';

export const getHealth = (req, res) => {
  res.status(200).json({ status: 'API is running...' });
};

export const getPortfolioData = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const education = await Education.find();
    const experience = await Experience.find();
    const projects = await Project.find();

    res.json({
      hero: profile?.hero || {},
      about: profile?.about || {},
      achievements: profile?.achievements || [],
      volunteering: profile?.volunteering || [],
      education,
      experience,
      projects
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
