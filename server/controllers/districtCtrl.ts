import { Request, Response } from 'express'
import District from '../models/District'

const districtCtrl = {
  read: async(req: Request, res: Response) => {
    try {
      const { cityId } = req.params
      const districts = await District.find({ cityId })
      return res.status(200).json({ data: districts })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default districtCtrl