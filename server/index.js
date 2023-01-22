const express = require('express')
const cors = require('cors')

const dbConnection = require('./config/connection')
const userRouter = require('./routes/user')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', userRouter)

app.use(dbConnection)

app.listen(4000)