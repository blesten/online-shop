import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db'
import routes from './routes'

dotenv.config({
  path: 'config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/user', routes.user)
app.use('/category', routes.category)
app.use('/product', routes.product)
app.use('/productDiscount', routes.productDiscount)
app.use('/ownerPick', routes.ownerPick)
app.use('/cart', routes.cart)
app.use('/wishlist', routes.wishlist)
app.use('/checkout', routes.checkout)
app.use('/review', routes.review)
app.use('/reset', routes.reset)
app.use('/province', routes.province)
app.use('/city', routes.city)
app.use('/district', routes.district)

connectDB()
require('./scheduler/discountScheduler')

app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))