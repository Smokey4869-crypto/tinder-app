import express from 'express'
import cors from 'cors'
import { v1 as uuidv1 } from 'uuid'
import bcrypt from 'bcrypt'
// import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

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
app.use("/users", users)
app.get('/messages', messages)


app.listen(PORT, () => console.log("Server is running on " + PORT))