import express from 'express'
import { addMatch, findByGender, getMatches, getUser, update } from '../controllers/users.js'

const router = express.Router()

router.get('/', getUser)
router.put("/update", update)
router.get("/gendered", findByGender)
router.put("/addmatch", addMatch)
router.get("/matches", getMatches)


export default router