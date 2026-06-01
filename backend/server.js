import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Profile from './models/Profile.js';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial Profile if empty
    const count = await Profile.countDocuments();
    if (count === 0) {
      await Profile.create({
        hero: {
          name: 'Your Name',
          title: 'Full Stack Developer / Software Engineer',
          intro: 'IT undergraduate, SLIIT, MERN developer'
        },
        about: {
          bio: 'Passionate about full-stack development & system analysis. I build scalable applications with modern technologies.',
          skills: {
            Frontend: ['React', 'Tailwind', 'React Native'],
            Backend: ['Node.js', 'Express', 'Spring Boot'],
            Database: ['MongoDB'],
            Tools: ['Git', 'Agile', 'JWT', 'OAuth2', 'GCP basics']
          }
        },
        achievements: ['4× Dean’s List Awards'],
        volunteering: ['IEEE Club Member', 'Rotaract Volunteer']
      });
      console.log('Database seeded with default profile data');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();

// Routes
// Public aggregate and health routes
app.use('/api', portfolioRoutes);

// Model routes (these map to what the frontend expects)
app.use('/api/admin', authRoutes); // /api/admin/login
app.use('/api/admin/profile', profileRoutes); // /api/admin/profile (PUT)
app.use('/api/admin/education', educationRoutes); // /api/admin/education
app.use('/api/admin/experience', experienceRoutes); // /api/admin/experience
app.use('/api/admin/project', projectRoutes); // /api/admin/project
app.use('/api/contact', messageRoutes); // /api/contact (POST)

// Admin messages uses /api/admin/messages, but our messageRoutes has both GET and POST inside it.
// If we map to /api/admin/messages, the GET and DELETE will be at /api/admin/messages, but POST will be at /api/admin/messages.
// Our frontend currently does not use messages, but previous publicController had /api/contact mapped to submitContact.
app.use('/api/admin/messages', messageRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
