import { Request, Response } from 'express'
import City from './../models/City'

const cityCtrl = {
  read: async(req: Request, res: Response) => {
    try {
      const { provinceId } = req.params
      const city = await City.find({ provinceId })
      return res.status(200).json({ data: city })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default cityCtrl