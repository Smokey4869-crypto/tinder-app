import bcrypt from 'bcrypt'
import { UserModel } from '../models/User.js'
import jwt from 'jsonwebtoken'

const URL = process.env.DATABASE_URL

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })

        if (!user) {
            res.status(404).json("User not found")
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("Wrong password")


            if (user && validPassword) {
                const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 24, })
                res.status(201).json({ token, userId: user.user_id })
            } else {
                res.status(400).json("Invalid credentials")
            }
        }
        
    } catch(err) {
        console.log(err)
    }
}

export const signup = async (req, res) => {
    const { email, password } = req.body

    const generatedUserId = uuidv1()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })

        if (user) {
            return res.status(409).send('User already exists. Please login or try with another email')
        } else {
            const sanitizedEmail = email.toLowerCase()
            const data = new UserModel({
                user_id: generatedUserId,
                email: sanitizedEmail,
                password: hashedPassword
            })

            await data.save()
            const newUser = await UserModel.findOne({
                email: req.body.email
            })

            const token = jwt.sign({ newUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 24, })
            res.status(201).json({ token, userId: generatedUserId })
        }
    } catch (err) {
        console.log(err)
    }
}
