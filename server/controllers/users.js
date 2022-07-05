import { UserModel } from '../models/User'

const URL = process.env.DATABASE_URL

export const getUser = async (req, res) => {
    const userId = req.query.userId

    try {
        const user = await UserModel.findOne({ 
            user_id: userId 
        })

        res.send({ user })
    } catch (err) {
        console.log(err)
    } 
}

export const update = async (req, res) => {
    const formData = req.body.formData

    try {
        const filter = { user_id: formData.user_id }
        const update = {
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

        let newUser = await UserModel.findOneAndUpdate(filter, update)
        newUser = await UserModel.findOne(filter)
        res.send({ newUser })
    } catch (err) {
        console.log(err)
    }
}

export const findByGender = async (req, res) => {
    const gender = req.query.gender

    try {
        const query = { gender_identity: gender }

        const foundUsers = await UserModel.find(query)

        res.send(foundUsers)
    } catch (err) {
        console.log(err)
    } 
}

export const addMatch = async (req, res) => {
    const { userId, matchedUserId } = req.body

    try {
        const filter = { user_id: userId }
        const user = await UserModel.findOne(filter)
        const matches = user.matches
        const update = {
            matches: [ ...matches, matchedUserId ]
        }

        const updatedUser = await UserModel.findOneAndUpdate(filter, update)

        res.send(updatedUser)
    } catch (err) {
        console.log(err)
    }
}

export const getMatches = async (req, res) => {
    const userIds = JSON.parse(req.query.userIds)

    try {
        const pipeline = [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ]

        const foundUsers = await UserModel.aggregate(pipeline).toArray()
        res.send(foundUsers)

    } catch (err) {
        console.log(err)
    }
}