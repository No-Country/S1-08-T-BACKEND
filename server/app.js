import express, { urlencoded, json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

import { config } from 'dotenv'

import userRouter from '../routers/userRouter/index.js'
import uploadRouter from '../routers/uploadRouter/index.js'
import postRouter from '../routers/postRouter/index.js'
import commentRouter from '../routers/commentRouter/index.js'

//dotenv
config()

//initializations
const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

//Middlewares
app.use(morgan('dev'))

//Routes

//users
app.use('/api/users', userRouter)

//posts
app.use('/api/posts', postRouter)

//comments
app.use('/api/comments', commentRouter)

//uploads
app.use('/api/uploads', uploadRouter)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('Server ready')
})

app.use((err, req, res) => {
  res.status(500).send({ message: err.message })
})

export default app
