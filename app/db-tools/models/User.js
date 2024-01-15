import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
  createdAt: String,
  updatedAt: String,
}, { timestamps: true });

// Check if the model exists using mongoose.models
const User = mongoose.models || mongoose.model('User', userSchema);

export default User;
