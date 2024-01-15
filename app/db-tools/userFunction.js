import User from './models/User';

export async function addUser(username, password, avatar, email) {

  const newUser = new User({
    username,
    password,
    avatar,
    email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  try {
    await newUser.save();
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
}