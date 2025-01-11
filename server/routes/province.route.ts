import provinceCtrl from './../controllers/provinceCtrl'
import express from 'express'

const router = express.Router()

router.route('/').get(provinceCtrl.read)

export default router