import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      min: 10,
      max: 12,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    company: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    companyID: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;