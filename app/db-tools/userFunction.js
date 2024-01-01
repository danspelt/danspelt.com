import connectToDatabase from './connect';
import User from './models/User';

// Add a new user
export async function addUser(username, password, avatar, email) {
  await connectToDatabase();

  const user = new User({
    username,
    password,
    avatar,
    email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await user.save();
}

// Get a user by username
export async function getUser(username) {
  await connectToDatabase();

  return User.findOne({ username });
}

// Update a user's details
export async function updateUser(username, updates) {
  await connectToDatabase();

  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  // Update fields
  Object.keys(updates).forEach((key) => {
    user[key] = updates[key];
  });
  user.updatedAt = new Date().toISOString();

  await user.save();
}

// Delete a user
export async function deleteUser(username) {
  await connectToDatabase();

  const result = await User.deleteOne({ username });
  if (result.deletedCount === 0) {
    throw new Error('User not found');
  }
}