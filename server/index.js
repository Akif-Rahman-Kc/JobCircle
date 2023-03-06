import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { config } from 'dotenv'
config()

import dbConnection from './config/connection.js'
import userRouter from './routes/user.js'
import vendorRouter from './routes/vendor.js'
import adminRouter from './routes/admin.js'

const app = express()

app.use(logger('dev'));
app.use(express.json())
app.use(cors())

app.use('/api/', userRouter)
app.use('/api/vendor', vendorRouter)
app.use('/api/admin', adminRouter)

app.use(dbConnection)

app.listen(4000)