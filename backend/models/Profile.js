import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    hero: {
      name: { type: String, default: 'Leshanie Bogoda Arachchi' },
      title: { type: String, default: 'Full Stack Developer' },
      intro: {
        type: String,
        default: 'IT undergraduate, SLIIT, Business Analysis',
      },
    },
    about: {
      bio: {
        type: String,
        default: 'Short bio about full-stack development & system analysis',
      },
      skills: {
        Frontend: { type: [String], default: ['React', 'Tailwind', 'React Native'] },
        Backend: { type: [String], default: ['Node.js', 'Express', 'Spring Boot'] },
        Database: { type: [String], default: ['MongoDB'] },
        Tools: { type: [String], default: ['Git', 'Agile', 'JWT', 'OAuth2', 'GCP basics'] },
      },
    },
    achievements: [{ type: String }],
    volunteering: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
