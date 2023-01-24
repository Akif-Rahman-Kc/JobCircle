import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
config()

import dbConnection from './config/connection.js'
import userRouter from './routes/user.js'
import vendorRouter from './routes/vendor.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', userRouter)
app.use('/vendor', vendorRouter)

app.use(dbConnection)

app.listen(4000)