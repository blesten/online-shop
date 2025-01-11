import { Request, Response } from 'express'
import Province from '../models/Province'

const provinceCtrl = {
  read: async(req: Request, res: Response) => {
    try {
      const province = await Province.find()
      return res.status(200).json({ data: province })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default provinceCtrl