import express from 'express'
import cors from 'cors'
import { v1 as uuidv1} from 'uuid'
import bcrypt from 'bcrypt'
// import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

import auth from './routes/auth.js'
import users from './routes/users.js'

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

app.use('/auth/login', async (req, res) => {
    const client = new MongoClient(URL)
    const { email, password } = req.body
    console.log(req.body)

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const user = await users.findOne({email})
        const correctPassword = await bcrypt.compare(password, user.password)

        if (user && correctPassword) {
            const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 24,})
            res.status(201).json({ token, userId:  user.user_id})
        }

        res.status(400).send("Invalid credentials")
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.use('/auth/signup', async (req, res) => {
    const client = new MongoClient(URL)
    const { email, password } = req.body
    
    const generatedUserId = uuidv1()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).send('User already exists. Please login or try with another email')
        } else {
            const sanitizedEmail = email.toLowerCase()
            const data = {
                user_id: generatedUserId,
                email: sanitizedEmail,
                password: hashedPassword
            }

            const newUser = await users.insertOne(data)
            const token = jwt.sign({newUser}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 24,})
            res.status(201).json({token, userId: generatedUserId})
        }
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }

})

app.put('/user/update', async (req, res) => {
    const client = new MongoClient(URL)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            }
        }
        
        const newUser = await users.updateOne(query, updateDocument)
        res.send({ newUser })
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.get('/user', async (req, res) => {
    const client = new MongoClient(URL)
    const userId = req.query.userId

    console.log('userId', userId)
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)

        res.send(user)
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.get('/user/gendered', async (req, res) => {
    const client = new MongoClient(URL)
    const gender = req.query.gender

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const query = { gender_identity: gender }

        const foundUsers = await users.find(query).toArray()

        res.send(foundUsers)
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.put('/user/addmatch', async (req, res) => {
    const client = new MongoClient(URL)
    const { userId, matchedUserId } = req.body

    console.log('matched', matchedUserId)

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
    
        const query = { user_id: userId }
        const updateDocument = {
            $push: { matches: { user_id: matchedUserId }}
        }

        const user = await users.updateOne(query, updateDocument)

        res.send(user)
    } catch(err) {
        console.log(err) 
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log("Server is running on " + PORT))