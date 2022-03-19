import bcrypt from 'bcrypt'
import { MongoClient } from 'mongodb'

const URL = process.env.DATABASE_URL

export const getAllUSers = async (req, res) => {
    const client = new MongoClient(URL)
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const result = await users.find().toArray()
        res.send(result)
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
}