import bcrypt from 'bcrypt'
import { UserModel } from '../models/User'

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

export const update = async (req, res) => {
    const formData = req.body.formData

    try {
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
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}