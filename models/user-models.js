import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: String,
  dateOfBirth: {
    type: Date,
  },
  friends: Array,
  privateInfo: String,
  password: String,
});

export default mongoose.model('User', userSchema);
