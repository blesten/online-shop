import express from 'express'
import userCtrl from '../controllers/userCtrl'
import { isAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.route('/').patch(isAuthenticated, userCtrl.update)
router.route('/register').post(userCtrl.register)
router.route('/login').post(userCtrl.login)
router.route('/logout').get(userCtrl.logout)
router.route('/refresh_token').get(userCtrl.refreshToken)

export default router