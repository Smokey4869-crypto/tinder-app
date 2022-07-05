import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import auth from './routers/auth.js'
import users from './routers/users.js'
import messages from './routers/messages.js'

dotenv.config();

const PORT = process.env.PORT || 5000
const URL = process.env.DATABASE_URL
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("Hello")
})

app.use("/auth", auth)
app.use("/user", users)
app.get('/messages', messages)


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch((err) => {
        console.log('err', err)
    });