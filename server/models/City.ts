import { ICity } from './../utils/interface'
import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
  provinceId: {
    type: mongoose.Types.ObjectId,
    ref: 'province'
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  externalId: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ICity>('city', citySchema)