import express from 'express'
import cityCtrl from '../controllers/cityCtrl'

const router = express.Router()

router.route('/:provinceId').get(cityCtrl.read)

export default router