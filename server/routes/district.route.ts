import express from 'express'
import districtCtrl from '../controllers/districtCtrl'

const router = express.Router()

router.route('/:cityId').get(districtCtrl.read)

export default router