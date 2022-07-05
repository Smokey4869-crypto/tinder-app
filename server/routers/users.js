import express from 'express'
import { findByGender, getUser, update } from '../controllers/users.js'

const router = express.Router()

router.get("/", getUser)
router.put("/update", update)
router.get("/gendered", findByGender)

export default router