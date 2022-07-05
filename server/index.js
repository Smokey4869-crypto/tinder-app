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

dotenv.config();

const PORT = process.env.PORT || 5000
const URL = process.env.DATABASE_URL
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("Hello")
})

// app.use('/users', async (req, res) => {
//     const client = new MongoClient(URL)
//     try {
//         await client.connect()
//         const database = client.db('data')
//         const users = database.collection('users')

//         const result = await users.find().toArray()
//         res.send(result)
//     } catch(err) {
//         console.log(err)
//     } finally {
//         await client.close()
//     }
// })

app.use("/auth", auth)
app.use("/users", users)


app.get('/user/matches', async (req, res) => {
    const client = new MongoClient(URL)
    const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const pipeline = [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ]

        const foundUsers = await users.aggregate(pipeline).toArray()
        // console.log(foundUsers)
        res.send(foundUsers)

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.get('/messages', async (req, res) => {
    const client = new MongoClient(URL)
    const { userId, correspondingUserId } = req.query

    // console.log(userId, correspondingUserId)

    try {
        await client.connect()
        const database = client.db('data')
        const messages = database.collection('messages')

        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }

        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
})


app.listen(PORT, () => console.log("Server is running on " + PORT))