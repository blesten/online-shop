import mongoose from 'mongoose'
import { IUser } from '../utils/interface'

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  gender: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  handphoneNo: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  
  role: {
    type: String,
    default: 'customer'
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  district: {
    type: String
  },
  postalCode: {
    type: String
  },
  address: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model<IUser>('user', userSchema)