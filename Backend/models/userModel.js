import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Enter valid Indian mobile number'],
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// TTL index for automatic deletion of expired OTPs
userSchema.index({ 'otp.expiresAt': 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model('User', userSchema);

export default User;
