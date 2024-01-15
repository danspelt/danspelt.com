import mongoose from 'mongoose';
  
const connectDatabase = async () => {
  console.log('Attempting to connect to MongoDB...');
 
  try {
    // Attempt to connect
    await mongoose.connect(process.env.MONGODB_URI, {  
    });
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    // Log any errors during connection
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectDatabase;