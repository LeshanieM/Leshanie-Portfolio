import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    university: { type: String, required: true },
    duration: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
