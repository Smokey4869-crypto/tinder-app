import express from 'express'
import { getAllUSers } from '../controllers/users.js'

const router = express.Router()

router.get("/", getAllUSers)


export default router